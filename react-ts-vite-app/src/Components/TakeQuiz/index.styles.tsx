import styled from 'styled-components';

type ButtonVariant = 'primary' | 'correct' | 'wrong' | 'outline';
export const Wrapper = styled.main`
  width: min(780px, 100%);
  margin: 0 auto;
  padding: 40px 24px 64px;
`;
export const QuizContainer = styled.section`
  width: 100%;
  .session-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; gap: 16px; }
  .session-header .eyebrow { margin: 0; }
  .session-progress { width: 120px; height: 2px; border: 0; background: var(--line); }
  .session-progress::-webkit-progress-bar { background: var(--line); }
  .session-progress::-webkit-progress-value { background: var(--red); }
  .session-progress::-moz-progress-bar { background: var(--red); }
  .result { padding: 48px 0; }
  .result-score { color: var(--red); font-size: clamp(64px, 15vw, 120px); line-height: 1; font-weight: 800; letter-spacing: -.07em; margin: 32px 0 20px; }
`;
export const FlipCard = styled.button`
  display: block;
  width: 100%;
  height: clamp(320px, 46vh, 450px);
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--ink);
  perspective: 1200px;
`;
export const FlipInner = styled.span<{ $isFlipped: boolean }>`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform .45s ease;
  transform: ${({ $isFlipped }) => $isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;
const CardFace = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32px;
  overflow: auto;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;
export const FlipFront = styled(CardFace)`background: var(--paper); color: var(--ink);`;
export const FlipBack = styled(CardFace)`background: var(--red); color: var(--paper); transform: rotateY(180deg);`;
export const CardTitle = styled.span`
  font-size: clamp(23px, 4vw, 36px);
  line-height: 1.3;
  letter-spacing: -.035em;
  font-weight: 700;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;
export const CardLabel = styled.span`
  display: block;
  margin-bottom: 30px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
`;
export const FlipHint = styled.span`
  display: block;
  margin-top: 32px;
  font-size: 12px;
`;
export const QuestionMeta = styled.p`
  margin: 24px 0 0;
  text-align: center;
  color: var(--muted);
  font-size: 13px;
`;
export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
`;
export const Button = styled.button<{ $variant: ButtonVariant; $selected?: boolean }>`
  min-height: 46px;
  padding: 12px 20px;
  border: 1px solid ${({ $selected, $variant }) => $selected || $variant === 'primary' ? 'var(--red)' : 'var(--line)'};
  background: ${({ $selected, $variant }) => $selected || $variant === 'primary' ? 'var(--red)' : 'transparent'};
  color: var(--paper);
  font-size: 13px;
  font-weight: 600;
  &:hover:not(:disabled) { border-color: var(--paper); }
  @media (max-width: 600px) { padding: 12px 14px; }
`;
