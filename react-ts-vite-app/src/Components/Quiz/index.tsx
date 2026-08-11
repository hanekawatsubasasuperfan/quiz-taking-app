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
    console.log(quizID)

    async function handleTakeQuiz(){
        navigate(({
            to:`/quiz/takeQuiz/${quizID}`
        }))
    }

    return (
        <Wrapper>
            <QuizActionCircle>
                <TakeQuiz onClick={handleTakeQuiz}>
                    Take Quiz
                </TakeQuiz>
                <ModifyQuiz>
                    Modify Quiz
                </ModifyQuiz>
            </QuizActionCircle>
        </Wrapper>
    );
    }