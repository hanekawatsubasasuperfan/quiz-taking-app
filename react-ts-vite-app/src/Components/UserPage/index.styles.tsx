import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100dvh;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

    gap: 15px;
    padding: 15px;

    background-color: #5f43b2;
`;

export const QuizBox = styled.div`
    aspect-ratio: 1 / 1;
    cursor:pointer;
    background-color: #b1aebb;
    border-radius: 20px;
    color: #35245f;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

