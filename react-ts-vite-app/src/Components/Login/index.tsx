import { 
  FormContainer, 
  LoginText, 
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

export default function App(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeUsername(e: ChangeEvent<HTMLInputElement>){
    setUsername(e.target.value)
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>){
    setPassword(e.target.value)
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    let data = await fetch("http://localhost:8000/api/auth/login", {
      credentials:"include",
      method:"POST",
      body:JSON.stringify({ "name": username, "password": password }),
      headers:{
        "Content-Type": "application/json",
      }
    });
    data = await data.json();
    console.log(data)
      
  }

  return(
  <>
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <LoginText>
          Login
        </LoginText>
        <UsernameInputLabel htmlFor="username" >
          Username
        </UsernameInputLabel>
        <UsernameInput id="username" value={username} onChange={handleChangeUsername}/>
        <PasswordInputLabel htmlFor="password">
          Password
        </PasswordInputLabel>
        <PasswordInput id="password" value={password} onChange={handleChangePassword}/>
        <Submit/>
      </FormContainer>
    </Wrapper>
  </>)
}
