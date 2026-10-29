import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { test } from 'node:test';
import type { Request, Response } from 'express';
import { errorLogging, requestLogging } from '../src/middleware/requestLogging.js';
import { logger } from '../src/utils/logger.js';

function response(statusCode = 200) {
    return Object.assign(new EventEmitter(), {
        locals: {} as Record<string, unknown>, statusCode, writableFinished: true,
        setHeader: (_name: string, _value: string) => {},
    });
}

test('requests record safe route templates, correlation IDs and failures only once', (t) => {
    const events: { code: string; data: any }[] = [];
    t.mock.method(logger, 'info', (code: string, _message: string, data: Record<string, unknown>) => events.push({ code, data }));
    t.mock.method(logger, 'error', (code: string, _message: string, data: Record<string, unknown>) => events.push({ code, data }));
    for (const status of [200, 401, 404, 500]) {
        const req = { method: 'GET', baseUrl: '/api/quiz', route: { path: '/:quizID/questions' },
            originalUrl: '/api/quiz/path-secret/questions?token=query-secret',
            headers: { authorization: 'Bearer header-secret' }, body: { password: 'body-secret' } };
        const res = response(status);
        let nextCalled = false;
        requestLogging(req as Request, res as unknown as Response, () => { nextCalled = true; });
        assert.ok(nextCalled);
        res.emit('finish');
        res.emit('close');
    }
    assert.equal(events.length, 4);
    assert.deepEqual(events.map(event => event.code), ['HTTP_REQUEST', 'HTTP_ERROR', 'HTTP_ERROR', 'HTTP_ERROR']);
    assert.ok(events.every(event => event.data.route === '/api/quiz/:quizID/questions'));
    assert.equal(new Set(events.map(event => event.data.requestId)).size, 4);
    assert.ok(events.every(event => event.data.durationMs >= 0));
    assert.ok(!JSON.stringify(events).includes('-secret'));
});

test('unmatched and aborted requests do not log raw URLs', (t) => {
    let event: any;
    t.mock.method(logger, 'error', (code: string, _message: string, data: Record<string, unknown>) => { event = { code, data }; });
    const res = response();
    res.writableFinished = false;
    requestLogging({ method: 'GET', originalUrl: '/secret' } as Request, res as unknown as Response, () => {});
    res.emit('close');
    assert.equal(event.code, 'HTTP_ABORTED');
    assert.equal(event.data.route, 'unmatched');
    assert.equal(event.data.aborted, true);
});

test('unhandled and parser errors return generic responses, preserving appropriate HTTP statuses', (t) => {
    const events: any[] = [];
    t.mock.method(logger, 'error', (code: string, _message: string, data: Record<string, unknown>) => events.push({ code, data }));
    for (const status of [400, 413, 500, 999]) {
        let responseStatus: number | undefined;
        let body: unknown;
        const res = {
            locals: { requestId: 'test-id' }, headersSent: false,
            status(value: number) { responseStatus = value; return this; },
            json(value: unknown) { body = value; },
        };
        errorLogging(Object.assign(new Error('sensitive-error'), { status }), {} as Request,
            res as unknown as Response, () => assert.fail('Should handle the error'));
        assert.equal(responseStatus, status < 500 ? status : 500);
        assert.ok(!JSON.stringify(body).includes('sensitive-error'));
    }
    assert.equal(events.length, 4);
});
