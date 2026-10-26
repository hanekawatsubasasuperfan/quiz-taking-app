import styled from 'styled-components';

export const Wrapper = styled.main`
  width: min(900px, 100%);
  margin: 0 auto;
  padding: 48px 24px 64px;
`;
export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 16px;
  margin-top: 44px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
export const TakeQuiz = styled.button`
  min-height: 240px;
  padding: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  gap: 36px;
  text-align: left;
  border: 1px solid var(--red);
  background: var(--red);
  color: var(--paper);
  .action-number { font-size: 12px; }
  .action-label { font-size: 32px; letter-spacing: -.04em; font-weight: 700; }
  .action-description { display: block; font-size: 13px; font-weight: 400; margin-top: 12px; letter-spacing: 0; }
  &:hover { background: var(--red-hover); }
`;
export const ModifyQuiz = styled(TakeQuiz)`
  background: var(--surface);
  border-color: var(--line);
  color: var(--paper);
  .action-description { color: var(--muted); }
  &:hover { background: var(--surface-hover); border-color: var(--paper); }
`;
