import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:5vh;
    width:20vw;
`;

export const QuestionDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AnswerDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Question = styled.input`
    height: 3.5vh;
`;

export const Answer = styled.input`
    height: 3.5vh;
`;

export const TopBar = styled.div`
    width:100%;
    height: 4.5vh;
    background-color: pink;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`;

export const CloseButton = styled.div`
    cursor: pointer;
    color:white;
    margin-right: 1rem;
    font-size: 2rem;
`;

export const Submit = styled.button`
    height: 4.5vh;
`;
