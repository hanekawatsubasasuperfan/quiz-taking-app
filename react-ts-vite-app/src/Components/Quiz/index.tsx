import {
    Wrapper,
    QuizActionCircle,
    TakeQuiz,
    ModifyQuiz,
} from "./index.styles";
import { getRouteApi, useNavigate } from "@tanstack/react-router";

export default function QuizOptions() {
    const route = getRouteApi('/quiz/$quizID');
    const {quizID} = route.useLoaderData();
    const navigate = useNavigate();

    async function handleTakeQuiz(){
        navigate(({
            to:`/quiz/takeQuiz/${quizID}`
        }))
    }

    async function handleModifyQuiz(){
        navigate(({
            to:`/quiz/quizModification/${quizID}`
        }))
    }

    return (
        <Wrapper>
            <QuizActionCircle>
                <TakeQuiz onClick={handleTakeQuiz}>
                    Take Quiz
                </TakeQuiz>
                <ModifyQuiz onClick={handleModifyQuiz}>
                    Modify Quiz
                </ModifyQuiz>
            </QuizActionCircle>
        </Wrapper>
    );
    }