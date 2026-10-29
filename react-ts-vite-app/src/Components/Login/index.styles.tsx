import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.main`
  min-height: calc(100dvh - 80px);
  display: grid;
  place-items: center;
  padding: 56px 24px;
  @media (max-width: 600px) { min-height: calc(100dvh - 68px); padding: 40px 24px; }
`;
export const FormContainer = styled.form`
  width: min(400px, 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  .eyebrow { margin-bottom: 8px; }
  .page-description { margin-bottom: 20px; }
  .form-error { margin: 0; }
  .auth-note { text-align: center; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  &[aria-labelledby] { position: relative; isolation: isolate; }
`;
export const LoginText = styled.h1`
  --bubble-shape: polygon(0 45%, 10% 0, 12% 27%, 100% 12%, 92% 94%, 16% 94%, 15% 69%, 7% 49%, 7% 39%);
  position: relative;
  isolation: isolate;
  margin: 0 0 28px;
  width: 100%;
  aspect-ratio: 700 / 200;
  display: grid;
  place-items: center;
  padding: 4% 12% 0 18%;
  color: var(--text);
  text-align: center;
  font-size: clamp(28px, 6vw, 40px);
  font-weight: 800;
  letter-spacing: -.06em;
  line-height: 1.05;
  &::before, &::after {
    content: '';
    position: absolute;
    clip-path: var(--bubble-shape);
    pointer-events: none;
  }
  &::before {
    inset: 0;
    z-index: -2;
    background: var(--text);
  }
  &::after {
    inset: 4px;
    z-index: -1;
    background: var(--surface-deep);
  }
`;
export const CloudHeading = styled.h1`
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 400 / 150;
  margin: 0 0 36px;
  padding-top: 24px;
  color: var(--text);
  font-size: clamp(28px, 6vw, 40px);
  font-weight: 800;
  letter-spacing: -.06em;
  line-height: 1.05;
  svg { position: absolute; inset: 0; width: 100%; height: 100%; filter: drop-shadow(5px 6px 0 var(--red)); }
  span { position: relative; }
`;

const rainfall = keyframes`
  0% { top: -18px; transform: translateX(6px); opacity: 0; }
  12% { opacity: .55; }
  85% { opacity: .35; }
  100% { top: 100%; transform: translateX(-12px); opacity: 0; }
`;

export const Rain = styled.div`
  position: absolute;
  inset: 130px 8% 68px;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  span {
    position: absolute;
    top: -18px;
    width: 2px;
    height: 16px;
    border-radius: 2px;
    background: linear-gradient(transparent, var(--text));
    animation: ${rainfall} 1.4s linear infinite;
    &:nth-child(3n) { background: linear-gradient(transparent, var(--red)); }
  }
  @media (max-width: 600px) { top: 105px; }
  @media (prefers-reduced-motion: reduce) { display: none; }
`;
export const UsernameInputLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
`;
export const PasswordInputLabel = styled(UsernameInputLabel)``;
export const UsernameInput = styled.input.attrs({ type: 'text', placeholder: 'Your username', autoComplete: 'username', required: true })`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 0;
  background: var(--surface);
  color: var(--text);
  margin-bottom: 12px;
  &::placeholder { color: var(--muted); }
  &:focus { border-color: var(--text); }
`;
export const PasswordInput = styled(UsernameInput).attrs({ type: 'password', placeholder: 'Your password', autoComplete: 'current-password' })``;
export const Submit = styled.input.attrs({ type: 'submit' })`
  padding: 15px 20px;
  margin-top: 8px;
  background: var(--red);
  color: var(--paper);
  border: 1px solid var(--red);
  border-radius: 0;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: var(--red-hover); border-color: var(--red-hover); }
  &:disabled { cursor: wait; opacity: .65; }
`;

export const EmailInput = styled(UsernameInput).attrs({ type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })``;
