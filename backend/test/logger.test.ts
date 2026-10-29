import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { createLogger } from '../src/utils/logger.js';

test('console and daily text files contain identical redacted entries and append across logger instances', (t) => {
    const directory = mkdtempSync(join(tmpdir(), 'quiz-logs-'));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    const output: string[] = [];
    t.mock.method(console, 'log', (line: string) => output.push(line));
    const original = process.env.LOG_TEST_SECRET;
    process.env.LOG_TEST_SECRET = 'configured-sensitive-value';
    t.after(() => {
        if (original === undefined) delete process.env.LOG_TEST_SECRET;
        else process.env.LOG_TEST_SECRET = original;
    });
    const error = Object.assign(new Error('password failed: raw-error-secret'), {
        code: '28P01', detail: 'db-detail-secret', cause: new Error('cause-secret'),
    });
    const cyclic: Record<string, unknown> = { count: 2n };
    cyclic.self = cyclic;
    createLogger(directory).error('AUTH_LOGIN_FAILED', 'Unable to log in', {
        password: 'plaintext-password',
        nested: [{ password_hash: 'hashed-password', accessToken: 'access-token-secret',
            Authorization: 'Bearer header-secret', cookie: 'cookie-secret', api_key: 'key-secret',
            privateKey: 'private-key-secret', database_url: 'database-secret' }],
        validation: [{ path: 'password', value: 'invalid-password', msg: 'Password is too short' }],
        context: 'configured-sensitive-value',
        transport: 'Bearer transport-secret',
        connection: 'postgres://user:url-password@host/db',
        assignment: 'password="assigned secret"',
        error, cyclic,
    });
    createLogger(directory).info('SERVER_STARTED', 'API server started', { port: 8001 });
    const files = readdirSync(directory);
    assert.equal(files.length, 1);
    assert.match(files[0]!, /^\d{4}-\d{2}-\d{2}\.txt$/);
    const saved = readFileSync(join(directory, files[0]!), 'utf8');
    assert.equal(saved, `${output.join('\n')}\n`);
    assert.match(output[0]!, /^\[AUTH_LOGIN_FAILED\]:error, /);
    assert.match(output[1]!, /^\[SERVER_STARTED\]:info, /);
    const payload = JSON.parse(output[0]!.split(':error, ')[1]!);
    assert.equal(payload.password, 'passwords');
    assert.equal(payload.validation[0].value, 'passwords');
    assert.equal(payload.nested[0].accessToken, 'tokens');
    assert.equal(payload.error.code, '28P01');
    assert.equal(payload.error.credentials, 'passwords');
    assert.equal(payload.cyclic.self, '[circular]');
    assert.equal(payload.cyclic.count, '2');
    assert.ok(!Number.isNaN(Date.parse(payload.timestamp)));
    for (const secret of ['plaintext-password', 'hashed-password', 'access-token-secret', 'header-secret',
        'cookie-secret', 'key-secret', 'private-key-secret', 'database-secret', 'invalid-password',
        'configured-sensitive-value', 'transport-secret', 'url-password', 'assigned secret',
        'raw-error-secret', 'db-detail-secret', 'cause-secret']) {
        assert.ok(!saved.includes(secret), `Leaked ${secret}`);
    }
});

test('unstructured thrown values and custom serialization cannot expose secrets or break logging', (t) => {
    const directory = mkdtempSync(join(tmpdir(), 'quiz-logs-'));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    const output: string[] = [];
    t.mock.method(console, 'log', (line: string) => output.push(line));
    const logger = createLogger(directory);
    logger.error('REQUEST_FAILED', 'Request failed', {
        error: { message: 'unstructured-secret' },
        object: { toJSON: () => 'serialization-secret', get value() { throw new Error('getter-secret'); } },
    });
    logger.error('REQUEST_FAILED\nforged line', 'Failure\nwith newline', { error: 'thrown-secret' });
    assert.equal(output.length, 2);
    assert.ok(output.every(line => !line.includes('\n')));
    assert.ok(output.every(line => !line.includes('-secret')));
    assert.match(output[1]!, /^\[APPLICATION_LOG\]:error, /);
});

test('file-write failures preserve the terminal event and emit a safe diagnostic', (t) => {
    const directory = mkdtempSync(join(tmpdir(), 'quiz-logs-'));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    const path = join(directory, 'not-a-directory');
    writeFileSync(path, '');
    const output: string[] = [];
    t.mock.method(console, 'log', (line: string) => output.push(line));
    assert.doesNotThrow(() => createLogger(path).error('TEST_FAILURE', 'Test error'));
    assert.equal(output.length, 2);
    assert.match(output[0]!, /^\[TEST_FAILURE\]:error, /);
    assert.match(output[1]!, /^\[LOG_WRITE_FAILED\]:error, /);
    assert.ok(!output.join('').includes(path));
});
