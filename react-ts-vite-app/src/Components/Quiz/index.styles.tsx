import styled from "styled-components";

export const Wrapper = styled.div`
    // -65px to take into account the nav bar
    min-height: calc(100dvh - 65px);

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #5f43b2;
    `;

export const QuizActionCircle = styled.div`
    width: 55dvh;
    height: 55dvh;

    border-radius: 50%;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    box-shadow: 0 15px 35px rgba(47, 33, 71, 0.3);
    `;

export const TakeQuiz = styled.button`
    flex: 1;

    border: none;

    background: linear-gradient(
        to bottom,
        #c6a5ff,
        #8064d8
    );

    color: white;
    font-size: 2rem;
    font-weight: bold;

    cursor: pointer;

    transition: filter 0.2s ease;

    &:hover {
        filter: brightness(1.08);
    }
    `;

export const ModifyQuiz = styled.button`
    flex: 1;

    border: none;

    background: linear-gradient(
        to bottom,
        #8064d8,
        #493382
    );

    color: white;
    font-size: 2rem;
    font-weight: bold;

    cursor: pointer;

    transition: filter 0.2s ease;

    &:hover {
        filter: brightness(1.08);
    }
    `;