import { FormContainer, LoginText, PasswordInput, PasswordInputLabel, UsernameInput, UsernameInputLabel, Wrapper } from "./index.styles";

export default function App(){
  return(
  <>
    <Wrapper>
      <FormContainer>
        <LoginText>
          Login
        </LoginText>
        <UsernameInputLabel htmlFor="username">
          Username
        </UsernameInputLabel>
        <UsernameInput id="username"/>
        <PasswordInputLabel>
          Password
        </PasswordInputLabel>
        <PasswordInput id="password"/>
      </FormContainer>
    </Wrapper>
  </>)
}
