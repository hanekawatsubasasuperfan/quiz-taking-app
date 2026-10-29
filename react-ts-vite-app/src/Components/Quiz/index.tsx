import { Wrapper, NoteList, NoteItem } from './index.styles';
import { getRouteApi, Link } from '@tanstack/react-router';
import ArrowIcon from '../ArrowIcon';
import { PaperSurface as Notebook } from '../Notebook/index.styles';

export default function QuizOptions() {
  const route = getRouteApi('/quiz/$quizID');
  const { quizID } = route.useLoaderData();

  return (
    <Wrapper>
      <Link className="notebook-back" to="/user"><span><ArrowIcon direction="left" /></span>Back to library</Link>
      <Notebook aria-labelledby="quiz-notes-heading">
        <span className="binder-holes" aria-hidden="true"><i /><i /><i /></span>
        <h1 id="quiz-notes-heading">Quiz {String(quizID).padStart(2, '0')}</h1>
        <NoteList role="list" aria-label="Quiz actions">
          <NoteItem>
            <Link to="/quiz/takeQuiz/$quizID" params={{ quizID }}>
              <span className="note-bullet" aria-hidden="true">•</span>
              <span className="note-label">Take quiz</span>
              <span className="note-arrow"><ArrowIcon /></span>
            </Link>
          </NoteItem>
          <NoteItem>
            <Link to="/quiz/quizModification/$quizID" params={{ quizID }}>
              <span className="note-bullet" aria-hidden="true">•</span>
              <span className="note-label">Edit quiz</span>
              <span className="note-arrow"><ArrowIcon /></span>
            </Link>
          </NoteItem>
        </NoteList>
      </Notebook>
    </Wrapper>
  );
}
