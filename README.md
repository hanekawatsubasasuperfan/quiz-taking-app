# quiz-taking-app

Start the API from the project root with `npm run dev:api`, then start the frontend in another terminal with `npm run dev:web`.

The backend defaults to port `8001`, and the root API command explicitly sets `PORT=8001`. An explicit `PORT` environment variable can override the default when starting the backend directly. Vite proxies `/api` to `http://127.0.0.1:8001`, keeping sign-in cookies on the frontend's origin.

The backend still reads its database and JWT settings from `backend/.env`. Production hosting must also forward `/api` to the backend.

API logs appear in the running server's terminal via `console.log` and are appended to `backend/logs/YYYY-MM-DD.txt` (UTC dates). Files survive restarts; a new file is used each day. The existing Git ignore rule excludes the logs directory. Logs are kept until you remove or archive them.

Errors use `[CODE]:error, {JSON data}`; normal requests and startup use `[CODE]:info, {JSON data}`. Each entry includes a UTC timestamp and a message. Request entries include an ID (also returned as the `X-Request-ID` response header), HTTP method, route template, status, and duration. For example:

```text
[AUTH_LOGIN_FAILED]:error, {"requestId":"...","error":{"name":"Error","code":"28P01","credentials":"passwords"},"timestamp":"2026-10-28T18:30:00.000Z","message":"Unable to log in"}
```

Use `logger.info(code, message, data)` or `logger.error(code, message, data)` from `backend/src/utils/logger.ts` for additional server events. Use fixed event codes and messages, and only pass necessary diagnostic data. Sensitive fields are replaced with labels such as `passwords`, `tokens`, or `API keys`, including nested fields. Requests do not log bodies, headers, cookies, query strings, or submitted path parameters. Error objects retain only recognized error names, machine-readable codes, and credential categories; raw messages, stacks, causes, and database details are omitted. Arbitrary secrets in unrelated free text cannot be reliably identified, so never pass raw request data or secrets in messages.

Follow today's file with `tail -f backend/logs/YYYY-MM-DD.txt` using the actual UTC date. Verify the logger with `npm test --prefix backend` and `npm run typecheck --prefix backend`.
