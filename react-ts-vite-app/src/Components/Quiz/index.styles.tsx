import styled from 'styled-components';

export const Wrapper = styled.main`
  width: min(860px, 100%);
  margin: 0 auto;
  padding: 36px 32px 72px;
  .notebook-back { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 32px; color: var(--text); font-size: 13px; font-weight: 600; }
  .notebook-back span { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid var(--text); }
  .notebook-back:hover span { background: var(--red); color: var(--paper); border-color: var(--red); }
  @media (max-width: 600px) { padding: 24px 20px 48px; }
`;

export const NoteList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const NoteItem = styled.li`
  > a {
    display: flex;
    align-items: center;
    gap: 18px;
    min-height: 64px;
    color: var(--ink);
    .note-bullet { flex-shrink: 0; font-size: 32px; line-height: 1; transform: translateY(-9px); }
    .note-label { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(26px, 4vw, 36px); font-style: italic; font-weight: 700; line-height: 1.4; transform: translateY(-9px); }
    .note-arrow {
      flex-shrink: 0;
      display: grid;
      place-items: center;
      width: 56px;
      height: 48px;
      margin-left: auto;
      color: var(--paper);
      background: var(--red);
      border: 2px solid var(--ink);
      box-shadow: 3px 3px 0 var(--ink);
      transform: rotate(-3deg);
      transition: transform .15s, background .15s;
    }
    &:hover .note-label { text-decoration: underline; text-decoration-color: var(--red); text-underline-offset: 6px; }
    &:hover .note-arrow, &:focus-visible .note-arrow { background: var(--ink); transform: translateX(3px); }
    &:focus-visible { outline: 3px solid var(--red); outline-offset: 8px; }
    @media (max-width: 600px) {
      gap: 10px;
      .note-label { font-size: clamp(22px, 6vw, 30px); }
      .note-bullet { font-size: 24px; }
      .note-arrow { width: 44px; height: 44px; }
    }
  }
`;
