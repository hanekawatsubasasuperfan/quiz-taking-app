import styled from "styled-components";

type ButtonVariant =
    | "primary"
    | "correct"
    | "wrong"
    | "outline";

    const buttonBackgrounds: Record<ButtonVariant, string> = {
    primary: "#f8b0c5",
    correct: "#cfe9d9",
    wrong: "#f8d4d4",
    outline: "transparent",
    };

    const buttonBorders: Record<ButtonVariant, string> = {
    primary: "1px solid #f09bb3",
    correct: "1px solid #9fc7b2",
    wrong: "1px solid #eab0b0",
    outline: "1.5px solid #e4b3c4",
    };

    const buttonColors: Record<ButtonVariant, string> = {
    primary: "#2f1e26",
    correct: "#1d4a3a",
    wrong: "#6b3232",
    outline: "#3d2a32",
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
    background-color: #ffb6c1;
    `;

    export const QuizContainer = styled.div`
    background-color: #c1ffb6;

    width: 550px;
    min-height: 350px;

    padding: 20px;

    border-radius: 20px;

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

    border-radius: 20px;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    box-shadow:
        inset 0 2px 10px rgba(255, 200, 210, 0.3),
        0 8px 20px rgba(190, 80, 110, 0.15);
    `;

    export const FlipFront = styled(CardFace)`
    background-color: #b6c1ff;
    `;

    export const FlipBack = styled(CardFace)`
    background-color: white;
    transform: rotateY(180deg);
    `;

    export const CardTitle = styled.h2`
    margin: 0;
    text-align: center;
    font-size: 1.8rem;
    `;

    export const CardLabel = styled.span`
    margin-top: 1rem;

    padding: 0.3rem 1rem;

    border-radius: 40px;

    background: rgba(255, 200, 210, 0.4);

    color: #8b5364;

    font-size: 0.8rem;

    text-transform: uppercase;
    `;

    export const FlipHint = styled.p`
    margin-top: 0.5rem;
    opacity: 0.5;
    font-size: 0.8rem;
    `;

    export const QuestionMeta = styled.div`
    margin-top: 15px;

    padding: 0.25rem 1.5rem;

    border-radius: 40px;

    background: rgba(255, 255, 255, 0.4);

    color: #6f4a57;
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
        transform: scale(1.02);
        box-shadow: 0 8px 18px rgba(200, 80, 120, 0.2);
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
    border-right: 40px solid blanchedalmond;
    border-bottom: 20px solid transparent;

    cursor: pointer;
`;

export const Forward = styled.div`
    width: 0;
    height: 0;

    border-top: 20px solid transparent;
    border-left: 40px solid blanchedalmond;
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

    color: red;

    font-size: large;
    font-weight: bold;

    cursor: pointer;
`;

export const Submit = styled.button`
    margin-top: 15px;
    margin-left: 30px;

    width: 85px;
    height: 30px;

    background-color: orange;

    border: 1px solid aliceblue;

    cursor: pointer;
`;