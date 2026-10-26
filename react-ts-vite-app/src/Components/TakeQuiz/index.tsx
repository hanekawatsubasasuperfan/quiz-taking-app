import { useState } from 'react';
import { getRouteApi, Link } from '@tanstack/react-router';
import { Wrapper, QuizContainer, FlipCard, FlipInner, FlipFront, FlipBack, CardTitle, CardLabel, FlipHint, QuestionMeta, ButtonGroup, Button } from './index.styles';

export default function Quiz() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [marks, setMarks] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);
  const route = getRouteApi('/quiz/takeQuiz/$quizID');
  const { questions } = route.useLoaderData();
  const { quizID } = route.useParams();
  const question = questions[index];
  const grade = Object.values(marks).filter(Boolean).length;

  function moveTo(next: number) {
    setIndex(next);
    setIsFlipped(false);
  }

  return (
    <Wrapper>
      <Link className="back-link" to="/quiz/$quizID" params={{ quizID }}>← Back to quiz</Link>
      {!question ? (
        <div className="empty-state">
          <h1>No questions yet.</h1>
          <p>Add a few questions to start practicing.</p>
          <Link className="back-link" to="/quiz/quizModification/$quizID" params={{ quizID }}>Edit this quiz →</Link>
        </div>
      ) : (
        <QuizContainer>
          {finished ? (
            <div className="result" role="status">
              <p className="eyebrow">Session complete</p>
              <h1 className="page-heading">That’s a wrap.</h1>
              <p className="result-score">{Math.round(grade / questions.length * 100)}%</p>
              <p className="page-description">{grade} of {questions.length} questions marked correct.</p>
              <Button $variant="primary" onClick={() => { setMarks({}); moveTo(0); setFinished(false); }}>Practice again →</Button>
            </div>
          ) : (
            <>
              <div className="session-header">
                <h1 className="eyebrow">Practice / Quiz {quizID}</h1>
                <progress className="session-progress" value={index + 1} max={questions.length} aria-label="Quiz progress" />
              </div>
              <FlipCard onClick={() => setIsFlipped(!isFlipped)} aria-label={isFlipped ? 'Show question' : 'Reveal answer'} aria-pressed={isFlipped}>
                <FlipInner $isFlipped={isFlipped}>
                  <FlipFront aria-hidden={isFlipped}>
                    <CardLabel>Question {String(index + 1).padStart(2, '0')}</CardLabel>
                    <CardTitle>{question.question}</CardTitle>
                    <FlipHint>Click or press Enter to reveal answer ↗</FlipHint>
                  </FlipFront>
                  <FlipBack aria-hidden={!isFlipped}>
                    <CardLabel>Answer</CardLabel>
                    <CardTitle>{question.answer}</CardTitle>
                    <FlipHint>Click or press Enter to show question ↗</FlipHint>
                  </FlipBack>
                </FlipInner>
              </FlipCard>
              <QuestionMeta aria-live="polite">{index + 1} / {questions.length} — {marks[question.id] === undefined ? 'How did you do?' : marks[question.id] ? 'Marked correct' : 'Marked for review'}</QuestionMeta>
              <ButtonGroup>
                <Button $variant="outline" aria-label="Previous question" onClick={() => moveTo(index - 1)} disabled={index === 0}>←</Button>
                <Button $variant="correct" $selected={marks[question.id] === true} aria-pressed={marks[question.id] === true} onClick={() => setMarks({ ...marks, [question.id]: true })}>✓ Got it</Button>
                <Button $variant="wrong" $selected={marks[question.id] === false} aria-pressed={marks[question.id] === false} onClick={() => setMarks({ ...marks, [question.id]: false })}>× Review</Button>
                {index === questions.length - 1 ? (
                  <Button $variant="primary" onClick={() => setFinished(true)}>Finish →</Button>
                ) : (
                  <Button $variant="outline" aria-label="Next question" onClick={() => moveTo(index + 1)}>→</Button>
                )}
              </ButtonGroup>
            </>
          )}
        </QuizContainer>
      )}
    </Wrapper>
  );
}
