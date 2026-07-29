import { useNavigate } from "@tanstack/react-router";
import { 
  FormContainer, 
  SignupText, 
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

export default function App(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

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
    const response = await fetch("http://localhost:8000/api/auth/signup", {
      credentials:"include", // makes sure cookies are stored
      method:"POST",
      body:JSON.stringify({ "name": username, "password": password, "email": email }),
      headers:{
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    console.log(data)
    if(data.code === 1){
      alert("Username already exists meow!")
    }
    else if(data.code === 2){
      alert("Email already exists meow!")
    }
    else if(data.code===3){
      alert("Successful signup, redirecting to user page")
      navigate({
        to:"/user"
      })
    } 
    else if(data.code===4){
      alert("Internal server error, pleast try again nyan!")
    }
  }

  return(
  <>
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <SignupText>
          Signup
        </SignupText>
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
        <PasswordInput id="password" value={password} onChange={handleChangePassword}/>
        <Submit/>
      </FormContainer>
    </Wrapper>
  </>)
}
