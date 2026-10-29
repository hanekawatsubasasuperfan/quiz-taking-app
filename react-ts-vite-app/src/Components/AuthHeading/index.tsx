import type { ReactNode } from 'react';
import { CloudHeading, Rain } from '../Login/index.styles';

export default function AuthHeading({ id, children }: { id: string; children: ReactNode }) {
  const gradientId = `${id}-cloud-fill`;

  return (
    <>
      <CloudHeading id={id}>
        <svg viewBox="0 0 400 150" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={gradientId} x2="0" y2="1">
              <stop stopColor="var(--surface)" />
              <stop offset="1" stopColor="var(--surface-deep)" />
            </linearGradient>
          </defs>
          <path d="M80 136C46 136 18 117 18 91C18 66 36 48 60 46C68 22 90 12 112 22C132 2 166 3 185 18C212 2 252 7 266 32C297 19 328 34 335 58C364 59 383 75 383 97C383 120 361 136 333 136Z" fill={`url(#${gradientId})`} stroke="var(--text)" strokeWidth="3" />
        </svg>
        <span>{children}</span>
      </CloudHeading>
      <Rain aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} style={{ left: `${4 + index * 7}%`, animationDelay: `${-index * .37}s`, animationDuration: `${1.2 + index % 3 * .25}s` }} />
        ))}
      </Rain>
    </>
  );
}
