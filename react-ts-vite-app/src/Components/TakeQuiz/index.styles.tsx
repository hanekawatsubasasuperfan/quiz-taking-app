import styled from "styled-components";

type ButtonVariant =
    | "primary"
    | "correct"
    | "wrong"
    | "outline";

const buttonBackgrounds: Record<ButtonVariant, string> = {
    // primary: "#f8b0c5",
    // correct: "#cfe9d9",
    // wrong: "#f8d4d4",
    // outline: "transparent",
    primary: "#bf79ff",
    correct: "#ead4ff",
    wrong: "#ffd6f4",
    outline: "#faf2ff",
    };

const buttonBorders: Record<ButtonVariant, string> = {
    // primary: "1px solid #b75ce8",
    // correct: "1px solid #b998e5",
    // wrong: "1px solid #f2a4cb",
    // outline: "1px solid #cda9ef",
    primary: "1px solid #9d4ee0",
    correct: "1px solid #c996ef",
    wrong: "1px solid #f1a8d7",
    outline: "1px solid #c996ef",
    };

const buttonColors: Record<ButtonVariant, string> = {
    // primary: "#ffffff",
    // correct: "#5b2d82",
    // wrong: "#8c3b68",
    // outline: "#5b2d82",
    primary: "#ffffff",
    correct: "#6b2d91",
    wrong: "#8d3b72",
    outline: "#6b2d91",
    };

export const Wrapper = styled.div`
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;

    background-image:
        radial-gradient(rgb(255, 255, 255) 21.6%, transparent 21.6%),
        radial-gradient(rgb(255, 255, 255) 21.6%, transparent 21.6%);

    background-position: 0 0, 32px 32px;
    background-size: 64px 64px;
    /* background-color: #ffb6c1; */
    background-color: #f3d7ff;
    `;

export const QuizContainer = styled.div`
    /* background-color: #c1ffb6; */
    background: #f8ebff;

    border: 2px solid #e2b6ff;

    box-shadow: 0 12px 30px rgba(133, 70, 170, 0.18);

    width: 550px;
    min-height: 350px;

    padding: 20px;

    border-radius: 28px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    `;

export const FlipCard = styled.div`
    width: 500px;
    height: 275px;

    perspective: 1200px;

    cursor: pointer;
    `;

export const FlipInner = styled.div<{
    $isFlipped: boolean;
    }>`
    position: relative;

    width: 100%;
    height: 100%;

    transform-style: preserve-3d;

    transition: transform 0.6s;

    transform: ${({ $isFlipped }) =>
        $isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
    `;

const CardFace = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-radius: 24px;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    box-shadow:
        /* inset 0 2px 10px rgba(255, 200, 210, 0.3),
        0 8px 20px rgba(190, 80, 110, 0.15); */
        inset 0 2px 10px rgba(255,255,255,.45),
        0 12px 30px rgba(123,58,162,.18);
    `;

export const FlipFront = styled(CardFace)`
    /* background-color: #b6c1ff; */
    /* background: linear-gradient(
        135deg,
        #f2d4ff,
        #ddb4ff
    ); */

    background: linear-gradient(
        135deg,
        #e6b0ff,
        #c97dff
    );
    color: #52246f;
    `;

export const FlipBack = styled(CardFace)`
    /* background-color: white; */
        background: linear-gradient(
        135deg,
        #fff6ff,
        #efd8ff
    );

    color: #52246f;
    transform: rotateY(180deg);
    `;

export const CardTitle = styled.h2`
    margin: 0;
    text-align: center;
    font-size: 1.8rem;
    color: #52246f;
    font-weight: 700;
    `;

    export const CardLabel = styled.span`
    margin-top: 1rem;

    padding: 0.3rem 1rem;

    border-radius: 40px;

    /* background: rgba(255, 200, 210, 0.4);

    color: #8b5364; */
    background: #e7c8ff;

    color: #6b2d91;

    font-size: 0.8rem;

    text-transform: uppercase;
    `;

export const FlipHint = styled.p`
    margin-top: 0.5rem;
    /* opacity: 0.5; */
    color:#8b5ea9;
    font-size: 0.8rem;
    `;

export const QuestionMeta = styled.div`
    margin-top: 15px;

    padding: 0.25rem 1.5rem;

    border-radius: 40px;

    /* background: rgba(255, 255, 255, 0.4);

    color: #6f4a57; */
    background:#edd6ff;

    color:#5d287d;

    border:1px solid #d9aef5;
    `;

export const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

    gap: 10px;

    margin-top: 20px;
    `;

export const Button = styled.button<{
    $variant: ButtonVariant;
    }>`
    padding: 0.7rem 1.4rem;

    border-radius: 60px;

    border: ${({ $variant }) =>
        buttonBorders[$variant]};

    background: ${({ $variant }) =>
        buttonBackgrounds[$variant]};

    color: ${({ $variant }) =>
        buttonColors[$variant]};

    font-size: 1rem;

    font-weight: ${({ $variant }) =>
        $variant === "primary" ? 700 : 600};

    cursor: pointer;

    transition: all 0.15s ease;

    &:hover:not(:disabled) {
        box-shadow: 
            /* 0 8px 18px rgba(200, 80, 120, 0.2); */
            0 10px 22px rgba(128,70,180,.25);
        transform: translateY(-2px) scale(1.02);
    }

    &:active:not(:disabled) {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

/* ---------- Old Components (kept for compatibility) ---------- */

export const QuizComponent = styled.div`
    width: 500px;
    height: 275px;
    border-radius: 10px;
`;

export const Card = styled.div`
    width: 100%;
    height: 100%;
`;

export const Question = styled.div`
    width: 100%;
    height: 100%;

    /* background-color: #cf8cff; */
    background: linear-gradient(
        135deg,
        #df9cff,
        #b85cff
    );

    color: #52246f;

    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Answer = styled.div`
    width: 100%;
    height: 100%;

    /* background-color: white; */
        background: linear-gradient(
        135deg,
        #fff6ff,
        #efd8ff
    );

    color: #52246f;

    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonContainer = styled.div`
    width: 150px;
    height: 50px;

    margin-top: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Backward = styled.div`
    width: 0;
    height: 0;

    border-top: 20px solid transparent;
    /* border-right: 40px solid blanchedalmond; */
    border-right: 40px solid #bf79ff;
    border-bottom: 20px solid transparent;

    cursor: pointer;
`;

export const Forward = styled.div`
    width: 0;
    height: 0;

    border-top: 20px solid transparent;
    /* border-left: 40px solid blanchedalmond; */
    border-left: 40px solid #bf79ff;
    border-bottom: 20px solid transparent;

    cursor: pointer;
`;

export const Marking = styled.div`
    width: 35px;
    height: 50px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
`;

export const Wrong = styled.div`
    position: relative;
    top: -20px;

    /* color: red; */
    color: #c84f9f;

    font-size: large;
    font-weight: bold;

    cursor: pointer;
`;

export const Submit = styled.button`
    margin-top: 15px;
    margin-left: 30px;

    width: 85px;
    height: 30px;

    /* background-color: orange;

    border: 1px solid aliceblue; */
    background: #bf79ff;
    border: 1px solid #9d4ee0;
    color: white;

    border-radius: 20px;

    font-weight: 600;

    transition: 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(128,70,180,.25);
    }

    cursor: pointer;
`;