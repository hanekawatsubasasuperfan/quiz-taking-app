import { useState } from 'react';
import { getRouteApi, Link } from '@tanstack/react-router';
import { PageWrapper, EditorContainer, Header, HeaderText, QuizTitle, SaveQuizButton, Sidebar, SidebarTitle, QuestionList, QuestionItem, AddQuestionButton, EditorPanel, QuestionNumber, FieldGroup, FieldLabel, TextInput, TextArea, ActionRow, DeleteButton } from './index.styles';
import modifyQuiz from '../../api/quiz/modifyQuiz';
import { DeleteQuestionFromQuiz } from '../../api/quiz/deleteQuestionFromQuiz';
import NewQuestionModal from './NewQuestionModal';
import createQuestion from '../../api/quiz/createQuestion';
import getAllQuestionsForQuiz from '../../api/quiz/questions';

export default function QuizModification() {
  const route = getRouteApi('/quiz/quizModification/$quizID');
  const data = route.useLoaderData();
  const { quizID } = route.useParams();
  const [questions, setQuestions] = useState(data.questions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const selectedQuestion = questions[selectedIndex];

  function changeField(field: 'question' | 'answer', value: string) {
    setStatus('');
    setQuestions(current => current.map((question, index) => index === selectedIndex ? { ...question, [field]: value } : question));
  }

  async function handleDeleteQuestion() {
    if (!selectedQuestion) return;
    setBusy(true);
    try {
      const result = await DeleteQuestionFromQuiz(selectedQuestion.id, Number(quizID));
      if (result.code !== 0) throw new Error();
      setQuestions(current => current.filter(question => question.id !== selectedQuestion.id));
      setSelectedIndex(Math.max(0, selectedIndex - 1));
      setStatus('Question deleted.');
    } catch { setStatus('Could not delete this question. Please try again.'); }
    finally { setBusy(false); }
  }

  async function handleSave() {
    setBusy(true);
    try {
      const result = await modifyQuiz(Number(quizID), { questions });
      setStatus(result.code === 0 ? 'Changes saved.' : 'Could not save changes. Please try again.');
    } catch { setStatus('Could not save changes. Please try again.'); }
    finally { setBusy(false); }
  }

  async function handleCreate(question: string, answer: string) {
    const result = await createQuestion({ question, answer, quiz_id: Number(quizID) });
    if (result.code !== 0) throw new Error('Could not add your question. Please try again.');
    const refreshed = await getAllQuestionsForQuiz(Number(quizID));
    // Preserve any edits to existing questions while adding the newly created question.
    setQuestions(current => [...current, ...refreshed.questions.filter(item => !current.some(existing => existing.id === item.id))]);
    setSelectedIndex(questions.length);
    setIsNewQuestionModalOpen(false);
    setStatus('Question added.');
  }

  return (
    <PageWrapper>
      <Link className="back-link" to="/quiz/$quizID" params={{ quizID }}>← Back to quiz</Link>
      <EditorContainer>
        <Header>
          <HeaderText><h1>Edit quiz.</h1><QuizTitle>Quiz {quizID} / {questions.length} {questions.length === 1 ? 'question' : 'questions'}</QuizTitle></HeaderText>
          <SaveQuizButton type="button" onClick={handleSave} disabled={busy || !questions.length}>{busy ? 'Working…' : 'Save changes →'}</SaveQuizButton>
        </Header>
        <Sidebar>
          <SidebarTitle>Questions</SidebarTitle>
          <QuestionList>
            {questions.map((question, index) => (
              <QuestionItem key={question.id} type="button" $isSelected={index === selectedIndex} aria-pressed={index === selectedIndex} onClick={() => setSelectedIndex(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span><p>{question.question || 'Untitled question'}</p>
              </QuestionItem>
            ))}
          </QuestionList>
          <AddQuestionButton type="button" disabled={busy} onClick={() => setIsNewQuestionModalOpen(true)}>+ Add question</AddQuestionButton>
        </Sidebar>
        <EditorPanel>
          {selectedQuestion ? (
            <>
              <QuestionNumber>Question {String(selectedIndex + 1).padStart(2, '0')}</QuestionNumber>
              <FieldGroup><FieldLabel htmlFor="question">Question</FieldLabel><TextArea id="question" value={selectedQuestion.question} onChange={event => changeField('question', event.target.value)} /></FieldGroup>
              <FieldGroup><FieldLabel htmlFor="answer">Answer</FieldLabel><TextInput id="answer" value={selectedQuestion.answer} onChange={event => changeField('answer', event.target.value)} /></FieldGroup>
              <ActionRow><DeleteButton type="button" disabled={busy} onClick={handleDeleteQuestion}>Delete question</DeleteButton></ActionRow>
            </>
          ) : (
            <div className="empty-state"><h2>A blank slate.</h2><p>Add your first question to get this quiz started.</p></div>
          )}
          <p className="editor-status" role="status">{status}</p>
        </EditorPanel>
      </EditorContainer>
      <NewQuestionModal isOpen={isNewQuestionModalOpen} onClose={() => setIsNewQuestionModalOpen(false)} handleSubmit={handleCreate} />
    </PageWrapper>
  );
}
