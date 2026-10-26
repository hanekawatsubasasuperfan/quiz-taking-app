# quiz-taking-app

Start the API from the project root with `npm run dev:api`, then start the frontend in another terminal with `npm run dev:web`.

The API command sets `PORT=8001` for that process. Vite proxies `/api` to `http://127.0.0.1:8001`, keeping sign-in cookies on the frontend's origin. This avoids other local services on port 8000 without changing the backend configuration.

The backend still reads its database and JWT settings from `backend/.env`. Production hosting must also forward `/api` to the backend.
