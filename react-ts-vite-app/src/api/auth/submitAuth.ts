interface AuthResponse {
  code?: number;
  errors?: { msg: string }[];
}

export default async function submitAuth(action: 'login' | 'signup', fields: { name: string; password: string; email?: string }) {
  let response: Response;
  try {
    response = await fetch(`/api/auth/${action}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    throw new Error(error instanceof Error && error.name === 'TimeoutError'
      ? 'The request timed out. Please try again.'
      : 'Could not connect to the account service. Please try again.', { cause: error });
  }

  const data: AuthResponse | null = await response.json().catch(() => null);
  if (response.ok && data?.code === (action === 'login' ? 1 : 3)) return;

  if (response.status === 400 && data?.errors?.length) {
    throw new Error(data.errors.map(error => error.msg).join(' '));
  }
  if (response.status === 401) {
    throw new Error('Invalid username or password. Please try again.');
  }
  if (response.status === 409) {
    throw new Error(data?.code === 1 ? 'This username is already taken.' : 'This email is already in use.');
  }
  throw new Error('The account service is unavailable. Please try again.');
}
