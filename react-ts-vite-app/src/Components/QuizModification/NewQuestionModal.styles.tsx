import styled from 'styled-components';
import { TextInput, SaveQuizButton } from './index.styles';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const QuestionDiv = styled.label`display: flex; flex-direction: column; gap: 10px; font-size: 12px; font-weight: 600;`;
export const AnswerDiv = styled(QuestionDiv)``;
export const Question = styled(TextInput)``;
export const Answer = styled(TextInput)``;
export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 { margin: 0; font-size: 24px; letter-spacing: -.04em; }
`;
export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid var(--line);
  color: var(--paper);
  background: transparent;
  font-size: 22px;
`;
export const Submit = styled(SaveQuizButton)``;
