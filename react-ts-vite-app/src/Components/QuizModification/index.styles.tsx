import styled from "styled-components";

interface QuestionItemProps {
  $isSelected: boolean;
}

export const PageWrapper = styled.main`
  min-height: 100dvh;
  padding: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    #faf2ff,
    #f5e7ff
  );
`;

export const EditorContainer = styled.section`
  width: min(1100px, 100%);
  min-height: 700px;

  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;

  overflow: hidden;

  background-color: white;
  border: 1px solid #ead4ff;
  border-radius: 24px;

  box-shadow: 0 18px 45px rgba(82, 36, 111, 0.15);
`;

export const Header = styled.header`
  grid-column: 1 / -1;

  padding: 28px 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: linear-gradient(
    135deg,
    #df9cff,
    #b85cff
  );

  color: #52246f;
`;

export const HeaderText = styled.div`
  h1 {
    margin: 0;
    font-size: 2rem;
  }
`;

export const QuizTitle = styled.p`
  margin: 6px 0 0;
  font-weight: 600;
`;

export const SaveQuizButton = styled.button`
  padding: 12px 20px;

  border: 1px solid #9d4ee0;
  border-radius: 12px;

  background-color: #bf79ff;
  color: white;

  font-weight: 700;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(82, 36, 111, 0.2);
  }
`;

export const Sidebar = styled.aside`
  padding: 26px 20px;

  display: flex;
  flex-direction: column;

  background-color: #faf2ff;
  border-right: 1px solid #ead4ff;
`;

export const SidebarTitle = styled.h2`
  margin: 0 0 18px;

  color: #52246f;
  font-size: 1.2rem;
`;

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  flex: 1;
`;

export const QuestionItem = styled.button<QuestionItemProps>`
  width: 100%;
  padding: 12px;

  display: flex;
  align-items: center;
  gap: 10px;

  text-align: left;

  border: 1px solid
    ${({ $isSelected }) =>
      $isSelected ? "#9d4ee0" : "#ead4ff"};

  border-radius: 12px;

  background-color: ${({ $isSelected }) =>
    $isSelected ? "#ead4ff" : "white"};

  color: #52246f;
  cursor: pointer;

  span {
    min-width: 28px;
    height: 28px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: #bf79ff;
    color: white;

    font-weight: 700;
  }

  p {
    margin: 0;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const AddQuestionButton = styled.button`
  margin-top: 20px;
  padding: 12px;

  border: 1px dashed #9d4ee0;
  border-radius: 12px;

  background-color: transparent;
  color: #7a36a6;

  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #ead4ff;
  }
`;

export const EditorPanel = styled.section`
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const QuestionNumber = styled.h2`
  margin: 0;

  color: #52246f;
  font-size: 1.6rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.label`
  color: #52246f;
  font-weight: 700;
`;

export const TextInput = styled.input`
  padding: 14px 16px;

  border: 1px solid #c996ef;
  border-radius: 12px;

  color: #52246f;
  font-size: 1rem;

  outline: none;

  &:focus {
    border-color: #9d4ee0;
    box-shadow: 0 0 0 3px rgba(191, 121, 255, 0.2);
  }
`;

export const TextArea = styled.textarea`
  min-height: 150px;
  padding: 16px;

  resize: vertical;

  border: 1px solid #c996ef;
  border-radius: 14px;

  color: #52246f;
  font-family: inherit;
  font-size: 1rem;

  outline: none;

  &:focus {
    border-color: #9d4ee0;
    box-shadow: 0 0 0 3px rgba(191, 121, 255, 0.2);
  }
`;

export const ActionRow = styled.div`
  margin-top: auto;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

export const DeleteButton = styled.button`
  padding: 11px 18px;

  border: 1px solid #f1a8d7;
  border-radius: 10px;

  background-color: #ffd6f4;
  color: #7c315f;

  font-weight: 700;
  cursor: pointer;
`;

export const SaveQuestionButton = styled.button`
  padding: 11px 18px;

  border: 1px solid #9d4ee0;
  border-radius: 10px;

  background-color: #bf79ff;
  color: white;

  font-weight: 700;
  cursor: pointer;
`;