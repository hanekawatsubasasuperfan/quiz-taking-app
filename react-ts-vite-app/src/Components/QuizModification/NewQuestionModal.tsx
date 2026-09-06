import { useState, useEffect, useRef, type ChangeEvent} from 'react';
import Modal from './modal';
import {Answer, CloseButton, Question, Submit, TopBar, Wrapper} from './NewQuestionModal.styles'

export interface NewQuestionData{
    question: string;
    answer: string;
}

interface NewQuestionModalProps{
    isOpen: boolean;
    onSubmit: (data: NewQuestionData) => void;
    onClose: () => void;
}

export default function NewQuestionModal({
    isOpen, 
    onClose, 
    onSubmit,
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

        function handleSubmit(){
            onSubmit({question, answer})
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
                    <Question onChange={handleQuestionChange}/>
                    <Answer onChange={handleAnswerChange}/>
                    <Submit onClick={handleSubmit}/>
                </Wrapper>
            </Modal>
        )
}