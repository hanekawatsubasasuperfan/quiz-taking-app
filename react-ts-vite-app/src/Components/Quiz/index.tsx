/* eslint-disable @typescript-eslint/no-unused-vars */
import {Wrapper, QuizComponent, Question, Answer, ButtonContainer, QuizContainer, Backward, Forward} from './Quiz.styles';
import {useState} from 'react';

interface Data{
    question:string;
    answer:string;
    index:number;
  }
  const questions: Data[]  = [
    {question: 'What is the capital of France?', answer: 'Paris', index: 0,},
    {question: 'What is the capital of China?', answer: 'Beijing', index: 1},
    {question: 'What is the capital of Canada?', answer: 'Ottawa', index: 2},
  ]

export default function Quiz() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questions[index].question);
  const [answer, setAnswer] = useState(questions[index].answer);
  const len_questions = questions.length;


  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleForward(){
    if(index+1<len_questions){
      // why doesnt this version work??
      // setIndex(index+1);
      // setQuestion(questions[index].question)
      // setAnswer(questions[index].answer)
      setQuestion(questions[index+1].question)
      setAnswer(questions[index+1].answer)
      setIndex(index+1);
    }
  }

  function handleBackward(){
    if(index-1>=0){
      setQuestion(questions[index-1].question)
      setAnswer(questions[index-1].answer)
      setIndex(index-1)
    }
  }

  return (
      <Wrapper>
          
        <QuizContainer>
          <QuizComponent onClick={handleFlip} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.6s' }}>
            {!isFlipped && <Question>{question}</Question>}
            {isFlipped && <Answer style={{transform: 'rotateY(180deg)'}}>{answer}</Answer>}
          </QuizComponent>
          <ButtonContainer>
            <Backward onClick={handleBackward}/>
            <Forward onClick={handleForward}/>
          </ButtonContainer>
        </QuizContainer>
      </Wrapper>
    )
}
