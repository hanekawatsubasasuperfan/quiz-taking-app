export default function ArrowIcon({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor"
      strokeWidth="2.8" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" focusable="false">
      <path d={direction === 'left' ? 'M20 12H4m7-7-7 7 7 7' : 'M4 12h16m-7-7 7 7-7 7'} />
    </svg>
  );
}
