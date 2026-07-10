/* eslint-disable @typescript-eslint/no-unused-vars */
import {Wrapper, QuizComponent, Question, Answer, ButtonContainer, QuizContainer, Backward, Forward, Marking, Wrong, Submit, Card} from './Quiz.styles';
import {useState} from 'react';
import './index.css';
import './button.css'



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
  const [grade, setGrade] = useState(0);
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

  function handleMark(mark:string){
    /*
    should I make it so that you cant go back to the previous question?
    you cant go back only if you've answered it?
    you can go back but you cant change your choice?
    for now I wont do any of those aforementioned and instead ill just make sure the grade cant go negative or be greater than the total number of questions
    */
    if(mark==="wrong"){
      if(grade-1<0){
        setGrade(0);
      }else{
        setGrade(grade-1)
      }
    }else if(mark==="correct"){
      if(grade+1>len_questions){
        setGrade(len_questions)
      }else{
        setGrade(grade+1);
      }
    }
    
    handleForward()
  }

  function handleSubmit(){
    /*
    should submit be possible at every location? if so when score is submitted should final grade be calculated using only the questions the user has gone through or just grade/len_questions?
    should submit only appear on the last page?(im going with this option for now)
    */



  }

  return (
      <Wrapper>
        <QuizContainer>
          <QuizComponent >
            <Card onClick={handleFlip} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.6s' }}>
              {!isFlipped && <Question>{question}</Question>}
              {isFlipped && <Answer style={{transform: 'rotateY(180deg)'}}>{answer}</Answer>}
            </Card>
            {index+1===len_questions ? <Submit>submit</Submit> : <></>}
          </QuizComponent>

          <ButtonContainer>
            <Backward onClick={handleBackward}/>
            <Marking>
              <ul onClick={()=>handleMark('correct')}>
                <li></li>
              </ul>
              <Wrong onClick={()=>handleMark('wrong')}>
                X
              </Wrong>
            </Marking>
            <Forward onClick={handleForward}/>
          </ButtonContainer>
        </QuizContainer>
      </Wrapper>
    )
}
