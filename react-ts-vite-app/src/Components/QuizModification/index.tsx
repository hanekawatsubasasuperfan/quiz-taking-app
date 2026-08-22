import { useState } from "react";
import {
    PageWrapper,
    EditorContainer,
    Header,
    HeaderText,
    QuizTitle,
    SaveQuizButton,
    Sidebar,
    SidebarTitle,
    QuestionList,
    QuestionItem,
    AddQuestionButton,
    EditorPanel,
    QuestionNumber,
    FieldGroup,
    FieldLabel,
    TextInput,
    TextArea,
    ActionRow,
    DeleteButton,
} from "./index.styles";
import { getRouteApi } from "@tanstack/react-router";
import modifyQuiz from "../../api/quiz/modifyQuiz";
import { DeleteQuestionFromQuiz } from "../../api/quiz/deleteQuestionFromQuiz";

interface Question {
    id: number;
    question: string;
    answer: string;
}

export default function QuizModification() {
    const route = getRouteApi('/quiz/quizModification/$quizID');
    const data = route.useLoaderData()
    const {quizID} = route.useParams();

    const [questions, setQuestions] = useState<Question[]>(data.questions);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedQuestion = questions[selectedIndex];

    function handleQuestionChange(value: string) {
        setQuestions((currentQuestions) =>
        currentQuestions.map((question, index) =>
            index === selectedIndex
            ? { ...question, question: value }
            : question
        )
        );
    }

    async function handleDeleteQuestion(){
        try{
            const data = await DeleteQuestionFromQuiz(selectedQuestion.id, Number(quizID));
            if(data.code==0){
                setQuestions(prev =>
                prev.filter(question => question.id !== selectedIndex)
                );
                if(selectedIndex + 1 < questions.length){
                    setSelectedIndex(selectedIndex+1)
                }else if(selectedIndex - 1 >= 0){
                    setSelectedIndex(selectedIndex-1)
                }else{
                    // create UI for when there are no quizzes
                }
                alert("Successfully deleted quiz")
            }else{
                alert("Error occured. Please try again.")
        }}catch(err){
            console.log(err)
        }
        
    }

    async function handleModifyQuestionSubmit(){
        await modifyQuiz(Number(quizID), {questions: questions});
    }

    function handleAnswerChange(value: string) {
        setQuestions((currentQuestions) =>
        currentQuestions.map((question, index) =>
            index === selectedIndex
            ? { ...question, answer: value }
            : question
        )
        );
    }

    return (
        <PageWrapper>
        <EditorContainer>
            <Header>
            <HeaderText>
                <h1>Edit Quiz</h1>
                <QuizTitle>Geography Review</QuizTitle>
            </HeaderText>

            <SaveQuizButton type="button" onClick={handleModifyQuestionSubmit}>
                Save Changes
            </SaveQuizButton>
            </Header>

            <Sidebar>
            <SidebarTitle>Questions</SidebarTitle>

            <QuestionList>
                {questions.map((question, index) => (
                <QuestionItem
                    key={question.id}
                    type="button"
                    $isSelected={index === selectedIndex}
                    onClick={() => {setSelectedIndex(index)}}
                >
                    <span>{index + 1}</span>
                    <p>{question.question}</p>
                </QuestionItem>
                ))}
            </QuestionList>

            <AddQuestionButton type="button">
                + Add Question
            </AddQuestionButton>
            </Sidebar>

            <EditorPanel>
            <QuestionNumber>
                Question {selectedIndex + 1}
            </QuestionNumber>

            <FieldGroup>
                <FieldLabel htmlFor="question">
                Question
                </FieldLabel>

                <TextArea
                id="question"
                value={selectedQuestion.question}
                onChange={(event) =>
                    handleQuestionChange(event.target.value)
                }
                />
            </FieldGroup>

            <FieldGroup>
                <FieldLabel htmlFor="answer">
                Answer
                </FieldLabel>

                <TextInput
                id="answer"
                value={selectedQuestion.answer}
                onChange={(event) =>
                    handleAnswerChange(event.target.value)
                }
                />
            </FieldGroup>

            <ActionRow>
                <DeleteButton type="button" onClick={handleDeleteQuestion}>
                    Delete
                </DeleteButton>

            </ActionRow>
            </EditorPanel>
        </EditorContainer>
        </PageWrapper>
    );
    }