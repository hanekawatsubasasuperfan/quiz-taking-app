import { useState } from "react";

import {
  Wrapper,
  QuizContainer,
  FlipCard,
  FlipInner,
  FlipFront,
  FlipBack,
  CardTitle,
  CardLabel,
  FlipHint,
  QuestionMeta,
  ButtonGroup,
  Button,
} from "./Quiz.styles";

interface Data {
  question: string;
  answer: string;
  index: number;
}

const questions: Data[] = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
    index: 0,
  },
  {
    question: "What is the capital of China?",
    answer: "Beijing",
    index: 1,
  },
  {
    question: "What is the capital of Canada?",
    answer: "Ottawa",
    index: 2,
  },
];

export default function Quiz() {
  const [grade, setGrade] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const len_questions = questions.length;
  const question = questions[index].question;
  const answer = questions[index].answer;

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleForward() {
    if (index < len_questions - 1) {
      setIndex(index + 1);
      setIsFlipped(false);
    }
  }

  function handleBackward() {
    if (index > 0) {
      setIndex(index - 1);
      setIsFlipped(false);
    }
  }

  function handleMark() {
    setGrade(grade + 1);
  }

  function handleSubmit() {
    let final_grade = grade / len_questions;

    final_grade =
      Math.round(final_grade * 10000) / 100;

    alert(
      `Final score ${grade}/${len_questions} or ${final_grade}%`,
    );
  }

  return (
    <Wrapper>
      <QuizContainer>
        <FlipCard onClick={handleFlip}>
          <FlipInner $isFlipped={isFlipped}>
            <FlipFront>
              <CardTitle>{question}</CardTitle>

              <CardLabel>Question</CardLabel>

              <FlipHint>
                Click to reveal answer
              </FlipHint>
            </FlipFront>

            <FlipBack>
              <CardTitle>{answer}</CardTitle>

              <CardLabel>Answer</CardLabel>

              <FlipHint>
                Click to show question
              </FlipHint>
            </FlipBack>
          </FlipInner>
        </FlipCard>

        <QuestionMeta>
          Question {index + 1} / {len_questions}
        </QuestionMeta>

        <ButtonGroup>
          <Button
            $variant="outline"
            onClick={handleBackward}
            disabled={index === 0}
          >
            ←
          </Button>

          <Button
            $variant="correct"
            onClick={handleMark}
          >
            ✓
          </Button>

          <Button $variant="wrong">
            ✕
          </Button>

          {index === len_questions - 1 ? (
            <Button
              $variant="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              $variant="outline"
              onClick={handleForward}
            >
              →
            </Button>
          )}
        </ButtonGroup>
      </QuizContainer>
    </Wrapper>
  );
}