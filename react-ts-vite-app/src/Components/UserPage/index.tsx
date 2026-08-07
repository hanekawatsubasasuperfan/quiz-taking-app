import { getRouteApi } from '@tanstack/react-router';
import { QuizBox, Wrapper } from './index.styles';


export default function index() {
  const routeApi = getRouteApi('/user/');
  const data = routeApi.useLoaderData();
  console.log(data)
  return (
    <Wrapper>

      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>
      <QuizBox/>

    </Wrapper>
  )
}
