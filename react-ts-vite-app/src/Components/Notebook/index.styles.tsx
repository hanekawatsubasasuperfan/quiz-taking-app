import styled from 'styled-components';

export const PaperSurface = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 608px;
  padding: 56px 48px 96px 108px;
  color: var(--ink);
  border: 1px solid #ded5bc;
  background-color: #fffbed;
  background-image: repeating-linear-gradient(to bottom, transparent 0 31px, rgb(123 123 123 / 42%) 31px 32px),
    linear-gradient(110deg, #fffef8, #fff5d9);
  background-position: 0 16px, 0 0;
  box-shadow: 7px 7px 0 #dfd5bb, 8px 8px 0 #b6aa8e, 0 18px 36px rgb(0 0 0 / 12%);
  &::before { content: ''; position: absolute; inset: 0 auto 0 76px; width: 1px; background: var(--red); box-shadow: 4px 0 0 rgb(217 35 35 / 25%); pointer-events: none; }
  &::after {
    content: '';
    position: absolute;
    width: 108px;
    height: 28px;
    top: -12px;
    right: 48px;
    background: rgb(230 200 124 / 65%);
    border-inline: 1px dashed rgb(149 119 53 / 30%);
    transform: rotate(5deg);
    pointer-events: none;
  }
  .binder-holes { position: absolute; inset: 88px auto 88px 24px; display: flex; flex-direction: column; justify-content: space-between; }
  .binder-holes i { width: 16px; height: 16px; border-radius: 50%; background: var(--background); box-shadow: inset 1px 2px 2px rgb(0 0 0 / 25%); }
  h1 {
    width: fit-content;
    max-width: 100%;
    margin: 0 0 54px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(32px, 5vw, 46px);
    font-style: italic;
    line-height: 64px;
    letter-spacing: -.04em;
    text-decoration: underline;
    text-decoration-color: var(--red);
    text-decoration-thickness: 3px;
    text-underline-offset: 10px;
    overflow-wrap: anywhere;
  }
  @media (max-width: 600px) {
    min-height: 512px;
    padding: 48px 20px 72px 52px;
    &::before { left: 34px; }
    &::after { width: 80px; right: 24px; }
    .binder-holes { left: 10px; }
    .binder-holes i { width: 12px; height: 12px; }
    h1 { margin-bottom: 30px; }
  }
`;

