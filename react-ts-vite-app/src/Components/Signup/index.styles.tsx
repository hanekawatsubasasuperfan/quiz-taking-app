import styled from "styled-components";

export const Wrapper = styled.div`
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;

    
    /* background-image: 
        radial-gradient(#9B5DE0 16%, transparent 16%),
        radial-gradient(#9B5DE0 16%, transparent 16%);
    background-position: 0px 0px, 40px 40px;
    background-size: 80px 80px;
    background-color: rgb(255, 255, 255); */
    background-color: #E5E5F7;
    opacity: 0.8;
    background: radial-gradient(circle, transparent 20%, #E5E5F7 20%, #E5E5F7 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #E5E5F7 20%, #E5E5F7 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#444CF7 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #444CF7 2px, #E5E5F7 2px) -1px 0;
    background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
`

export const FormContainer = styled.form`
    height:80dvh;
    width:60dvh;
    background-color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15dvh;
`

export const SignupText = styled.header`
    color: black;
    font-weight: bolder;
    font-size: x-large;
`;


export const UsernameInput = styled.input.attrs({type: "text", placeholder:"username"})`
    width:65%;
    height:6%;
`

export const UsernameInputLabel = styled.label`
    color:black;
    margin-bottom: -15dvh;
    font-weight: bold;
    font-size: large;
`;

export const PasswordInput = styled.input.attrs({type: "password", placeholder:"password"})`
    width:65%;
    height:6%;
`

export const PasswordInputLabel = styled.label`
    color:black;
    margin-bottom: -15dvh;
    font-weight: bold;
    font-size: large;
`;

export const Submit = styled.input.attrs({type:"submit"})`
    width: 35%;
    height: 6%;
    margin-top: -5dvh;

    background: linear-gradient(135deg, #6c63ff, #444cf7);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;

    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 8px 16px rgba(68, 76, 247, 0.3);
    }

    &:active {
        transform: translateY(0) scale(0.98);
    }
`

export const EmailInput = styled.input.attrs({type: "email", placeholder:"password"})`
    width:65%;
    height:6%;
`

export const EmailInputLabel = styled.label`
    color:black;
    margin-bottom: -15dvh;
    font-weight: bold;
    font-size: large;
`;