import styled, { keyframes } from 'styled-components';
import { PaperSurface } from '../Notebook/index.styles';

const turnForward = keyframes`
  0% { transform: rotateY(0deg); opacity: 1; }
  75% { opacity: 1; }
  100% { transform: rotateY(-175deg); opacity: 0; }
`;
const turnBackward = keyframes`
  0% { transform: rotateY(-175deg); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: rotateY(0deg); opacity: 1; }
`;

export const Book = styled.div`
  --notes-height: clamp(256px, 42svh, 416px);
  margin-bottom: 32px;
  .book-stage { position: relative; perspective: 1800px; }
  .book-clip { overflow: clip; padding: 18px 12px 24px; margin: -18px -12px -24px; }
  .sheet-back { position: absolute; inset: 0; transform: rotateY(180deg); backface-visibility: hidden; }
  .sheet-front { backface-visibility: hidden; }
  .measurement-sheet { position: absolute; inset: 0; visibility: hidden; pointer-events: none; z-index: -1; }
  .measurement-sheet .review-notes { overflow: visible; }
  .measurement-sheet li { max-height: none; }
  .book-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
`;

export const Sheet = styled(PaperSurface)`
  min-height: 0;
  padding: 32px 32px 24px 76px;
  &::before { left: 48px; }
  &::after { right: 24px; }
  .binder-holes { left: 16px; }
  .score-heading {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 20px;
    min-height: 96px;
    margin-bottom: 24px;
  }
  .score-heading h1 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(52px, 10vw, 72px);
    font-style: italic;
    line-height: 1.15;
    color: var(--red);
    text-decoration: none;
    letter-spacing: -.06em;
  }
  .score-heading p { margin: 0; color: var(--ink); font-size: 14px; font-weight: 700; }
  .review-notes { height: var(--notes-height); overflow: hidden; }
  .review-notes ul { list-style: none; padding: 0; margin: 0; }
  .review-notes li { position: relative; padding: 0 0 24px 24px; }
  .note-marker { position: absolute; left: 0; top: 0; color: var(--red-hover); font-family: Georgia, serif; font-size: 20px; line-height: 32px; }
  .review-question, .review-answer { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; line-height: 32px; }
  .review-question { font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: 700; font-style: italic; }
  .review-answer { font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: var(--red-hover); }
  .review-answer:empty { display: none; }
  .empty-notes { font-family: Georgia, 'Times New Roman', serif; font-style: italic; line-height: 32px; color: var(--red-hover); }
  .sheet-number { margin-top: 16px; text-align: right; font: 12px/24px 'Courier New', monospace; color: var(--red-hover); }
  @media (max-width: 600px) {
    min-height: 0;
    padding: 32px 16px 20px 42px;
    &::before { left: 28px; }
    .binder-holes { left: 8px; }
    .binder-holes i { width: 10px; height: 10px; }
    .score-heading { gap: 4px 12px; }
    .score-heading h1 { margin: 0; }
    .score-heading p { font-size: 12px; }
    .review-notes li { padding-left: 20px; }
    .review-question { font-size: 18px; }
    .review-answer { font-size: 16px; }
  }
`;

export const TurningSheet = styled.div<{ $direction: 'next' | 'previous' }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  transform-origin: left center;
  transform-style: preserve-3d;
  pointer-events: none;
  animation: ${({ $direction }) => $direction === 'next' ? turnForward : turnBackward} 650ms cubic-bezier(.4, 0, .2, 1) both;
  .sheet-front, .sheet-back { height: 100%; }
  .sheet-back { box-shadow: inset -32px 0 48px rgb(13 13 13 / 18%); }
  @media (prefers-reduced-motion: reduce) { animation-duration: 1ms; }
`;

export const PageControls = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 28px;
  .page-count { font-size: 12px; font-variant-numeric: tabular-nums; color: var(--text); text-align: center; }
  button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 8px 12px; border: 2px solid var(--text); background: var(--red); color: var(--paper); box-shadow: 3px 3px 0 var(--text); font-size: 12px; font-weight: 700; }
  button:hover:not(:disabled) { background: var(--red-hover); }
  button:disabled { opacity: 1; background: var(--surface); border-color: var(--line); box-shadow: none; color: var(--muted); }
  @media (max-width: 600px) { button { padding: 8px; } .button-label { display: none; } }
`;
