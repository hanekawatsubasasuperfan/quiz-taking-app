/* eslint-disable @typescript-eslint/no-unused-vars */
import {Wrapper, QuizContainer, QuizComponent, Question, Answer} from './Quiz.styles';
import {useState} from 'react';

export default function Quiz() {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    console.log('clicked');
    setIsFlipped(!isFlipped);
  }

  return (
      <Wrapper>
        {/* <QuizContainer> */}
          <QuizComponent onClick={handleFlip} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.6s' }}>
            {!isFlipped && <Question>What is the capital of France?</Question>}
            {isFlipped && <Answer style={{transform: 'rotateY(180deg)'}}>Paris</Answer>}
          </QuizComponent>
        {/* </QuizContainer> */}
      </Wrapper>
    )
}
