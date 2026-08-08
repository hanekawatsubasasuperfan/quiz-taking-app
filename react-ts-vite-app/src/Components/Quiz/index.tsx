    import {
    Wrapper,
    QuizActionCircle,
    TakeQuiz,
    ModifyQuiz,
    } from "./index.styles";

    export default function QuizOptions() {
    return (
        <Wrapper>
        <QuizActionCircle>
            <TakeQuiz>
            Take Quiz
            </TakeQuiz>

            <ModifyQuiz>
            Modify Quiz
            </ModifyQuiz>
        </QuizActionCircle>
        </Wrapper>
    );
    }