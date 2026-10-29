import styled from 'styled-components';

export const PageWrapper = styled.main`
  width: min(1150px, 100%);
  margin: 0 auto;
  padding: 40px 24px 64px;
`;
export const EditorContainer = styled.section`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  grid-template-rows: auto 1fr;
  border: 1px solid var(--line);
  min-height: 600px;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;
export const Header = styled.header`
  grid-column: 1 / -1;
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--line);
  @media (max-width: 500px) { padding: 24px; align-items: flex-start; flex-direction: column; }
`;
export const HeaderText = styled.div`
  h1 { margin: 0; font-size: 36px; letter-spacing: -.05em; }
`;
export const QuizTitle = styled.p`
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 13px;
`;
export const SaveQuizButton = styled.button`
  padding: 13px 20px;
  border: 1px solid var(--red);
  background: var(--red);
  color: var(--paper);
  font-size: 13px;
  font-weight: 600;
  &:hover:not(:disabled) { background: var(--red-hover); }
`;
export const Sidebar = styled.aside`
  min-width: 0;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--line);
  @media (max-width: 700px) { border-right: 0; border-bottom: 1px solid var(--line); }
`;
export const SidebarTitle = styled.h2`
  margin: 0 8px 20px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .14em;
`;
export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  max-height: 460px;
  overflow-y: auto;
  @media (max-width: 700px) { max-height: 180px; }
`;
export const QuestionItem = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  min-height: 48px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  border: 0;
  border-left: 2px solid ${({ $isSelected }) => $isSelected ? 'var(--red)' : 'transparent'};
  background: ${({ $isSelected }) => $isSelected ? 'var(--surface)' : 'transparent'};
  color: var(--text);
  span { color: ${({ $isSelected }) => $isSelected ? 'var(--red)' : 'var(--muted)'}; font-size: 12px; font-variant-numeric: tabular-nums; }
  p { margin: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 13px; }
  &:hover { background: var(--surface); }
`;
export const AddQuestionButton = styled.button`
  margin-top: 20px;
  padding: 14px 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  font-size: 13px;
  &:hover { border-color: var(--text); }
`;
export const EditorPanel = styled.section`
  min-width: 0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  .editor-status { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.5; }
  @media (max-width: 600px) { padding: 24px; }
`;
export const QuestionNumber = styled.h2`
  margin: 0;
  font-size: 22px;
  letter-spacing: -.035em;
`;
export const FieldGroup = styled.div`display: flex; flex-direction: column; gap: 10px;`;
export const FieldLabel = styled.label`font-size: 12px; font-weight: 600;`;
export const TextInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 0;
  background: var(--surface);
  color: var(--text);
  font-size: 15px;
  &:focus { border-color: var(--text); }
`;
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 170px;
  padding: 16px;
  resize: vertical;
  border: 1px solid var(--line);
  border-radius: 0;
  background: var(--surface);
  color: var(--text);
  font: inherit;
  line-height: 1.6;
  &:focus { border-color: var(--text); }
`;
export const ActionRow = styled.div`
  margin-top: auto;
  padding-top: 24px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--line);
`;
export const DeleteButton = styled.button`
  padding: 10px 0;
  border: 0;
  background: transparent;
  color: var(--error);
  font-size: 13px;
  &:hover { text-decoration: underline; text-underline-offset: 4px; }
`;
