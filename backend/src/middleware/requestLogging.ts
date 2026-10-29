import { randomUUID } from 'node:crypto';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import { logger } from '../utils/logger.js';

export const requestLogging: RequestHandler = (req, res, next) => {
    const started = performance.now();
    const requestId = randomUUID();
    res.locals.requestId = requestId;
    res.setHeader('X-Request-ID', requestId);
    let logged = false;
    const logRequest = () => {
        if (logged) return;
        logged = true;
        const aborted = !res.writableFinished;
        const failed = aborted || res.statusCode >= 400;
        // Route templates exclude submitted path parameters and query strings.
        const data = {
            requestId,
            method: req.method,
            route: req.route ? `${req.baseUrl}${req.route.path}` : 'unmatched',
            status: res.statusCode,
            durationMs: Math.round(performance.now() - started),
            ...(aborted ? { aborted: true } : {}),
        };
        if (failed) logger.error(aborted ? 'HTTP_ABORTED' : 'HTTP_ERROR', 'Request failed', data);
        else logger.info('HTTP_REQUEST', 'Request completed', data);
    };
    res.once('finish', logRequest);
    res.once('close', logRequest);
    next();
};

export const errorLogging: ErrorRequestHandler = (error, _req, res, _next) => {
    const status = Number(error?.status);
    const responseStatus = Number.isInteger(status) && status >= 400 && status < 500 ? status : 500;
    logger.error('REQUEST_FAILED', 'Request could not be handled', {
        requestId: res.locals.requestId,
        status: responseStatus,
        error,
    });
    if (res.headersSent) {
        res.destroy();
        return;
    }
    res.status(responseStatus).json({ status: 'error', msg: responseStatus === 500 ? 'Internal server error' : 'Invalid request' });
};
