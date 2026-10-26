import { 
  FormContainer, 
  PasswordInput, 
  PasswordInputLabel, 
  UsernameInput, 
  UsernameInputLabel, 
  Wrapper,
  Submit
  } 
from "./index.styles";

import { useState } from "react";
import type {ChangeEvent, SubmitEvent} from 'react'
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import AuthHeading from "../AuthHeading";
import submitAuth from "../../api/auth/submitAuth";

export default function App(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();
  const router = useRouter();

  function handleChangeUsername(e: ChangeEvent<HTMLInputElement>){
    setUsername(e.target.value)
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>){
    setPassword(e.target.value)
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    if (pending) return;
    setError("");
    setPending(true);
    try {
      await submitAuth('login', { name: username.trim(), password });
      await router.invalidate();
      await navigate({ to: '/user' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not sign in. Please try again.');
    } finally {
      setPending(false);
    }
      
  }

  return(
  <>
    <Wrapper>
      <FormContainer onSubmit={handleSubmit} aria-labelledby="sign-in-heading" aria-busy={pending}>
        <AuthHeading id="sign-in-heading">Sign in</AuthHeading>
        <UsernameInputLabel htmlFor="username" >
          Username
        </UsernameInputLabel>
        <UsernameInput id="username" name="username" value={username} onChange={handleChangeUsername}/>
        <PasswordInputLabel htmlFor="password">
          Password
        </PasswordInputLabel>
        <PasswordInput id="password" name="password" value={password} onChange={handleChangePassword}/>
        {error && <p className="form-error" role="alert">{error}</p>}
        <span className="sr-only" role="status">{pending ? 'Signing in…' : ''}</span>
        <Submit value={pending ? "Signing in…" : "Sign in"} disabled={pending}/>
        <p className="auth-note">New here? <Link to="/signup">Create an account</Link></p>
      </FormContainer>
    </Wrapper>
  </>)
}
