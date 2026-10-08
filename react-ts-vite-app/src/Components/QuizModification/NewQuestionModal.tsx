import { useState, useEffect, useRef, type ChangeEvent} from 'react';
import Modal from './modal';
import {Answer, AnswerDiv, CloseButton, Question, QuestionDiv, Submit, TopBar, Wrapper} from './NewQuestionModal.styles'

export interface NewQuestionData{
    question: string;
    answer: string;
}

interface NewQuestionModalProps{
    isOpen: boolean;
    onSubmit: (data?: NewQuestionData) => boolean;
    onClose: () => void;
    handleSubmit: (question: string, answer: string) => void;
}

export default function NewQuestionModal({
    isOpen, 
    onClose, 
    handleSubmit
    }:NewQuestionModalProps){
        const focusInputRef = useRef<HTMLInputElement>(null);
        const [question, setQuestion] = useState("")
        const [answer, setAnswer] = useState("")
        
        useEffect(()=>{
            if(isOpen && focusInputRef.current){
                setTimeout(()=>{
                    focusInputRef.current?.focus()
                },)
            }
        },[isOpen])

        function handleQuestionChange(e: ChangeEvent<HTMLInputElement>){
            setQuestion(e.target.value)
        }  
        
        function handleAnswerChange(e: ChangeEvent<HTMLInputElement>){
            setAnswer(e.target.value)
        }   

        
        function handleClose(){
            onClose();
        }
        
        return(
            <Modal
                hasCloseBtn = {false}
                isOpen = {isOpen}
            >
                <Wrapper>
                    <TopBar>
                        <CloseButton onClick = {handleClose}>
                            X
                        </CloseButton>
                    </TopBar>
                    <QuestionDiv>
                        Question
                        <Question onChange={handleQuestionChange}/>
                    </QuestionDiv>
                    <AnswerDiv>
                        Answer
                        <Answer onChange={handleAnswerChange}/>
                    </AnswerDiv>
                    
                    <Submit onClick={()=>{handleSubmit(question, answer)}}>
                        Submit
                    </Submit>
                </Wrapper>
            </Modal>
        )
}