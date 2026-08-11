import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { QuizBox, Wrapper } from './index.styles';


export default function Index() {
  const routeApi = getRouteApi('/user/');
  const navigate = useNavigate();
  const data = routeApi.useLoaderData();

  async function onHandleClick(quizID:number){
    navigate(({to:`/quiz/${quizID}`}))
  }


  const listQuizzes = data.quizzes.map((quiz) => 
    (<QuizBox key={quiz.id} onClick={()=>onHandleClick(quiz.id)}> 
      {quiz.title}
    </QuizBox>)
  )
  return (
    <Wrapper>
      
      {listQuizzes}


    </Wrapper>
  )
}
