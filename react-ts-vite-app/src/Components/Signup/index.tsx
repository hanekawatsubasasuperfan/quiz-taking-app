import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { 
  FormContainer, 
  PasswordInput, 
  PasswordInputLabel, 
  UsernameInput, 
  UsernameInputLabel, 
  Wrapper,
  Submit,
  EmailInput,
  EmailInputLabel
  } 
from "./index.styles";

import { useState } from "react";
import type {ChangeEvent, SubmitEvent} from 'react'
import AuthHeading from "../AuthHeading";
import submitAuth from "../../api/auth/submitAuth";

export default function App(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
  
  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value)
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    if (pending) return;
    setError("");
    setPending(true);
    try {
      await submitAuth('signup', { name: username.trim(), email: email.trim(), password });
      await router.invalidate();
      await navigate({ to: '/user' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not create your account. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return(
  <>
    <Wrapper>
      <FormContainer onSubmit={handleSubmit} aria-labelledby="sign-up-heading" aria-busy={pending}>
        <AuthHeading id="sign-up-heading">Sign up</AuthHeading>
        <UsernameInputLabel htmlFor="username" >
          Username
        </UsernameInputLabel>
        <UsernameInput id="username" value={username} onChange={handleChangeUsername}/>
        <EmailInputLabel htmlFor="email">
          Email
        </EmailInputLabel>
        <EmailInput id="email" value={email} onChange={handleChangeEmail}/>
        <PasswordInputLabel htmlFor="password">
          Password
        </PasswordInputLabel>
        <PasswordInput autoComplete="new-password" id="password" value={password} onChange={handleChangePassword}/>
        {error && <p className="form-error" role="alert">{error}</p>}
        <span className="sr-only" role="status">{pending ? 'Creating account…' : ''}</span>
        <Submit value={pending ? "Creating account…" : "Sign up"} disabled={pending}/>
        <p className="auth-note">Already have an account? <Link to="/login">Sign in</Link></p>
      </FormContainer>
    </Wrapper>
  </>)
}
