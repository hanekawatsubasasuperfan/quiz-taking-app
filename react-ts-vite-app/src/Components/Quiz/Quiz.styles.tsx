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
    background-color: #c1ffb6;
    width:550px;
    height:350px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const QuizComponent = styled.div`
    width:500px;
    height:275px;
    border-radius: 10px;
`;  

export const Card = styled.div`
    height:100%;
    width:100%
`;



export const Question = styled.div`
    width: 100%;
    height: 100%;
    //b6c1ff
    //90D5FF
    background-color: #b6c1ff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

`;
export const Answer = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonContainer = styled.div`
    width: 150px;
    height:50px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
`;

export const Backward = styled.div`
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-right: 40px solid blanchedalmond;
    border-bottom: 20px solid transparent;
`;

export const Forward = styled.div`
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-left: 40px solid blanchedalmond;
    border-bottom: 20px solid transparent;
`;

export const Marking = styled.div`
    height:50px;
    width:35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 0;
    `;

export const Wrong = styled.div`
    color: red;
    font-size: large;
    font-weight: bolder;
    top: -20px;
    position: relative;

`;


export const Submit = styled.button`
    margin-top:15px;
    margin-left:30px;
    width:85px;
    height:30px;
    background-color: orange;
    border-color: aliceblue;

`;