import { appendFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

type LogLevel = 'info' | 'error';
type LogData = Record<string, unknown>;

export const logDirectory = fileURLToPath(new URL('../../logs/', import.meta.url));

function credentialType(key: string): string | undefined {
    const normalized = key.replace(/[^a-z0-9]/gi, '').toLowerCase();
    if (/password|passwd|pwd/.test(normalized)) return 'passwords';
    if (/authorization|authentication|credentials/.test(normalized)) return 'authentication credentials';
    if (/cookie/.test(normalized)) return 'cookies';
    if (/token|sessionid/.test(normalized)) return 'tokens';
    if (/apikey/.test(normalized)) return 'API keys';
    if (/secret|privatekey/.test(normalized)) return 'secret keys';
    if (/connectionstring|databaseurl/.test(normalized)) return 'database credentials';
    if (/username|dbuser/.test(normalized)) return 'usernames';
    return undefined;
}

function redactText(text: string): string {
    // Also remove configured credentials if they appear in an otherwise ordinary field.
    for (const [key, value] of Object.entries(process.env)) {
        const type = credentialType(key);
        if (type && value) text = text.split(value).join(type);
    }
    return text
        .replace(/\b(?:Bearer|Basic)\s+[^\s,;]+/gi, 'authentication credentials')
        .replace(/\beyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, 'tokens')
        .replace(/\b[a-z][a-z0-9+.-]*:\/\/[^\s]+/gi, 'connection URLs')
        .replace(/\b(password|passwd|pwd|token|secret|api[_-]?key)\s*[:=]\s*(?:"[^"]*"|'[^']*'|[^\s,;]+)/gi,
            (_match, key: string) => credentialType(key) ?? 'credentials');
}

export function sanitizeLogData(value: unknown, seen = new WeakSet<object>(), depth = 0): unknown {
    if (typeof value === 'string') return redactText(value);
    if (typeof value === 'bigint') return value.toString();
    if (value === null || typeof value !== 'object') {
        return typeof value === 'function' || typeof value === 'symbol' ? '[unsupported]' : value;
    }
    if (seen.has(value)) return '[circular]';
    if (depth > 10) return '[depth limit]';
    seen.add(value);
    try {
        if (value instanceof Error) {
            // Error messages, stacks, causes and database detail can embed submitted secrets.
            // Keep only known error types and machine-readable codes, never arbitrary text.
            const code = Object.getOwnPropertyDescriptor(value, 'code')?.value;
            const names = ['Error', 'TypeError', 'RangeError', 'SyntaxError', 'ReferenceError',
                'TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError', 'AggregateError'];
            return {
                name: names.includes(value.name) ? value.name : 'Error',
                ...(typeof code === 'string' && /^(?:[0-9][A-Z0-9]{4}|E[A-Z_]{2,40})$/.test(code)
                    ? { code } : {}),
                ...(credentialType(value.message) ? { credentials: credentialType(value.message) } : {}),
            };
        }
        if (Array.isArray(value)) return value.map(item => sanitizeLogData(item, seen, depth + 1));
        const result: Record<string, unknown> = Object.create(null);
        const fields = Object.getOwnPropertyDescriptors(value);
        const fieldType = typeof fields.path?.value === 'string' ? credentialType(fields.path.value) : undefined;
        for (const [key, descriptor] of Object.entries(fields)) {
            if (!descriptor.enumerable) continue;
            const type = credentialType(key) ?? (key === 'value' ? fieldType : undefined);
            result[redactText(key)] = type ?? (key === 'error' && !(descriptor.value instanceof Error)
                ? { name: 'NonErrorThrown' } : 'value' in descriptor
                ? sanitizeLogData(descriptor.value, seen, depth + 1) : '[getter omitted]');
        }
        return result;
    } finally {
        seen.delete(value);
    }
}

export function createLogger(directory = logDirectory) {
    function write(code: string, level: LogLevel, message: string, data: LogData = {}) {
        const timestamp = new Date().toISOString();
        const safeCode = /^[A-Z][A-Z0-9_]{0,63}$/.test(code) ? code : 'APPLICATION_LOG';
        let payload: unknown;
        try {
            payload = sanitizeLogData({ ...data, timestamp, message });
        } catch {
            payload = { timestamp, message: 'Log data could not be safely serialized' };
        }
        const line = `[${safeCode}]:${level}, ${JSON.stringify(payload)}`;
        console.log(line);
        try {
            mkdirSync(directory, { recursive: true, mode: 0o700 });
            // Append synchronously so errors survive an immediate process exit or restart.
            appendFileSync(join(directory, `${timestamp.slice(0, 10)}.txt`), `${line}\n`, { mode: 0o600 });
        } catch {
            // Never recursively log a write failure or include a potentially sensitive path.
            console.log(`[LOG_WRITE_FAILED]:error, ${JSON.stringify({ timestamp, message: 'Unable to append to the log file' })}`);
        }
    }
    return {
        info: (code: string, message: string, data?: LogData) => write(code, 'info', message, data),
        error: (code: string, message: string, data?: LogData) => write(code, 'error', message, data),
    };
}

export const logger = createLogger();
