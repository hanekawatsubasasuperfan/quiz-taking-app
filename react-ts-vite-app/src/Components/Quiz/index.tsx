import { Wrapper, ActionGrid, TakeQuiz, ModifyQuiz } from './index.styles';
import { getRouteApi, Link, useNavigate } from '@tanstack/react-router';

export default function QuizOptions() {
  const route = getRouteApi('/quiz/$quizID');
  const { quizID } = route.useLoaderData();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Link className="back-link" to="/user">← Back to library</Link>
      <p className="eyebrow">Quiz {String(quizID).padStart(2, '0')}</p>
      <h1 className="page-heading">Ready when<br />you are.</h1>
      <p className="page-description">Put your knowledge to work, or fine-tune your questions.</p>
      <ActionGrid>
        <TakeQuiz onClick={() => navigate({ to: '/quiz/takeQuiz/$quizID', params: { quizID } })}>
          <span className="action-number">01 / PRACTICE</span>
          <span className="action-label">Take quiz ↗<span className="action-description">Flip the cards. See what you remember.</span></span>
        </TakeQuiz>
        <ModifyQuiz onClick={() => navigate({ to: '/quiz/quizModification/$quizID', params: { quizID } })}>
          <span className="action-number">02 / EDIT</span>
          <span className="action-label">Edit quiz ↗<span className="action-description">Add, edit, or remove your questions.</span></span>
        </ModifyQuiz>
      </ActionGrid>
    </Wrapper>
  );
}
