import styled from 'styled-components';

export const Wrapper = styled.main`
  min-height: calc(100dvh - 80px);
  padding: 40px 0 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  h1 {
    margin: 0;
    padding: 0 24px;
    color: var(--paper);
    text-align: center;
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 600;
    letter-spacing: -.025em;
    line-height: 1.25;
  }
  .quiz-selection { width: 100%; min-width: 0; }
  .selection-heading { display: flex; flex-direction: column; align-items: center; gap: 20px; }
  .empty-state { width: min(520px, calc(100% - 48px)); }
  @media (max-width: 600px) {
    min-height: calc(100dvh - 68px);
    padding: 32px 0 40px;
    gap: 24px;
  }
`;

export const LayoutToggle = styled.div`
  display: inline-flex;
  padding: 4px;
  border: 1px solid var(--line);
  background: var(--surface);
  button {
    min-height: 36px;
    padding: 8px 16px;
    border: 0;
    background: transparent;
    color: var(--muted);
    font-size: 13px;
    font-weight: 600;
  }
  button[aria-pressed='true'] { background: var(--paper); color: var(--ink); }
  button:hover:not([aria-pressed='true']) { color: var(--paper); }
`;

export const Carousel = styled.ul<{ $vertical: boolean }>`
  --card-width: ${({ $vertical }) => $vertical ? '320px' : '540px'};
  position: relative;
  display: flex;
  gap: 32px;
  width: 100%;
  margin: 0;
  padding: 16px max(24px, calc((100% - var(--card-width)) / 2)) 24px;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  li {
    flex: 0 0 min(var(--card-width), calc(100vw - 48px));
    min-width: 0;
    display: flex;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }
`;

export const QuizCard = styled.button<{ $active: boolean; $vertical: boolean }>`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  aspect-ratio: ${({ $vertical }) => $vertical ? '5 / 7' : '7 / 5'};
  min-width: 0;
  min-height: 360px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  border: 3px solid var(--paper);
  background: var(--surface-deep);
  color: var(--paper);
  box-shadow: 7px 7px 0 ${({ $active }) => $active ? 'var(--red)' : 'var(--line)'};
  opacity: ${({ $active }) => $active ? 1 : .65};
  text-align: left;
  transition: opacity .2s, box-shadow .2s;
  .card-art { position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; pointer-events: none; }
  .quiz-index { align-self: flex-start; padding: 4px 9px; border: 1px solid var(--surface-deep); background: var(--paper); color: var(--ink); font-family: 'Courier New', monospace; font-size: 15px; font-weight: 800; transform: rotate(-5deg); }
  h2 {
    flex: 1;
    display: grid;
    place-items: center;
    min-width: 0;
    margin: 0;
    text-align: center;
    font-size: ${({ $vertical }) => $vertical ? '24px' : 'clamp(28px, 4.5vw, 44px)'};
    font-weight: 700;
    line-height: 1.65;
  }
  .cutout-word { display: inline-flex; flex-wrap: wrap; justify-content: center; max-width: calc(100% - 14px); gap: 2px; margin: 3px 7px; vertical-align: middle; }
  .cutout-letter {
    display: inline-block;
    padding: .02em .1em;
    border: 1px solid var(--line);
    background: var(--paper);
    color: var(--ink);
    font-family: Georgia, 'Times New Roman', serif;
    line-height: 1.05;
    box-shadow: 1px 2px 0 var(--surface-deep);
    transform: rotate(-4deg);
  }
  .cutout-letter:nth-child(2n) { background: var(--ink); color: var(--paper); border-color: var(--paper); font-family: Arial, sans-serif; transform: rotate(4deg) translateY(-2px); }
  .cutout-letter:nth-child(3n) { font-family: 'Courier New', monospace; transform: rotate(-7deg) translateY(2px); }
  .cutout-letter:nth-child(5n) { transform: rotate(7deg) scaleY(1.1); }
  &[data-long-title] { aspect-ratio: auto; }
  &[data-long-title] h2 { font-size: clamp(20px, 3vw, 28px); }
  .quiz-bottom { display: flex; align-items: center; justify-content: space-between; }
  .quiz-action { padding: 6px 12px; border: 1px solid var(--paper); background: var(--ink); font-size: 15px; font-weight: 700; transform: rotate(-2deg); }
  .quiz-arrow { padding: 0 8px; border: 1px solid var(--ink); background: var(--paper); color: var(--ink); font-size: 30px; line-height: 1.2; transform: rotate(5deg); }
  &:hover { opacity: 1; box-shadow: 7px 7px 0 var(--red); }
  &:focus-visible { outline: 2px solid var(--paper); outline-offset: 5px; opacity: 1; }
  @media (max-width: 600px) {
    min-height: ${({ $vertical }) => $vertical ? '300px' : '220px'};
    padding: 20px;
    h2 { font-size: clamp(20px, 6vw, 28px); }
  }
`;

export const CarouselControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  color: var(--paper);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  .total { color: var(--muted); }
  button { width: 44px; height: 44px; border: 1px solid var(--line); background: var(--ink); color: var(--paper); font-size: 23px; }
  button:hover:not(:disabled) { border-color: var(--paper); background: var(--paper); color: var(--ink); }
`;
