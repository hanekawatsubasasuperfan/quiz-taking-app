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
  SaveQuestionButton,
} from "./quizModification.styles";

interface Question {
    id: number;
    question: string;
    answer: string;
}

export default function QuizModification() {
    const [questions, setQuestions] = useState<Question[]>([
    {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
    },
    {
        id: 2,
        question: "What is the capital of Canada?",
        answer: "Ottawa",
    },
    ]);

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

            <SaveQuizButton type="button">
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
                    onClick={() => setSelectedIndex(index)}
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
                <DeleteButton type="button">
                Delete
                </DeleteButton>

                <SaveQuestionButton type="button">
                Save Question
                </SaveQuestionButton>
            </ActionRow>
            </EditorPanel>
        </EditorContainer>
        </PageWrapper>
    );
    }