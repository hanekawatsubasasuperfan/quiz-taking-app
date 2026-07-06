import styled from "styled-components";

export const Wrapper = styled.div`
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image:
        radial-gradient(rgb(255, 255, 255) 21.6%, transparent 21.6%),
        radial-gradient(rgb(255, 255, 255) 21.6%, transparent 21.6%);
    background-position: 0px 0px, 32px 32px;
    background-size: 64px 64px;
    /* background-color: rgb(231, 51, 255); */
    background-color: #FFB6C1;
    background-size: 'cover';
    background-repeat: 'no-repeat';
    width: '100dvw';
    height: '100dvh';
`;

export const QuizContainer = styled.div`
    background-color: #90D5FF;
    width:550px;
    height:350px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const QuizComponent = styled.div`
    width:500px;
    height:275px;
    border-radius: 10px;
`;  

export const Question = styled.div`
    width: 100%;
    height: 100%;
    background-color: #90D5FF;
    border-radius: 20px;

`;
export const Answer = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 20px;
`;
