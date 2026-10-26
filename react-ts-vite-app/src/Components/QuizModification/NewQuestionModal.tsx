import { useState, type SubmitEvent } from 'react';
import Modal from './modal';
import { Answer, AnswerDiv, CloseButton, Question, QuestionDiv, Submit, TopBar, Wrapper } from './NewQuestionModal.styles';

interface NewQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (question: string, answer: string) => Promise<void>;
}

export default function NewQuestionModal({ isOpen, onClose, handleSubmit }: NewQuestionModalProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await handleSubmit(question.trim(), answer.trim());
      setQuestion('');
      setAnswer('');
    } catch { setError('Could not add your question. Please try again.'); }
    finally { setBusy(false); }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="new-question-heading">
      <Wrapper onSubmit={submit}>
        <TopBar><h2 id="new-question-heading">New question.</h2><CloseButton type="button" aria-label="Close dialog" disabled={busy} onClick={onClose}>×</CloseButton></TopBar>
        <QuestionDiv>Question<Question data-autofocus required value={question} onChange={event => setQuestion(event.target.value)} /></QuestionDiv>
        <AnswerDiv>Answer<Answer required value={answer} onChange={event => setAnswer(event.target.value)} /></AnswerDiv>
        {error && <p className="form-error" role="alert">{error}</p>}
        <Submit type="submit" disabled={busy || !question.trim() || !answer.trim()}>{busy ? 'Adding…' : 'Add question →'}</Submit>
      </Wrapper>
    </Modal>
  );
}
