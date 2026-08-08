import { getRouteApi } from '@tanstack/react-router';
import { QuizBox, Wrapper } from './index.styles';


export default function index() {
  const routeApi = getRouteApi('/user/');
  const data = routeApi.useLoaderData();
  const listQuizzes = data.quizzes.map((quiz) => 
    (<QuizBox key={quiz.id}> 
      {quiz.title}
    </QuizBox>)
  )
  return (
    <Wrapper>
      
      {listQuizzes}


    </Wrapper>
  )
}
