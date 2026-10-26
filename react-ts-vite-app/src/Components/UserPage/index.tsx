import { useLayoutEffect, useRef, useState } from 'react';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { Carousel, CarouselControls, LayoutToggle, QuizCard, Wrapper } from './index.styles';

const spiral = Array.from({ length: 281 }, (_, index) => {
  const angle = index / 280 * Math.PI * 8;
  const radius = 8 + angle * 16;
  return `${index === 0 ? 'M' : 'L'}${(300 + Math.cos(angle) * radius).toFixed(1)},${(210 + Math.sin(angle) * radius * .9).toFixed(1)}`;
}).join(' ');

function CutoutTitle({ title }: { title: string }) {
  return (
    <h2 aria-label={title}>
      <span aria-hidden="true">
        {title.split(/\s+/).filter(Boolean).map((word, wordIndex) => (
          <span className="cutout-word" key={wordIndex}>
            {Array.from(word).map((letter, letterIndex) => <span className="cutout-letter" key={letterIndex}>{letter}</span>)}
            {' '}
          </span>
        ))}
      </span>
    </h2>
  );
}

export default function Index() {
  const routeApi = getRouteApi('/user/');
  const navigate = useNavigate();
  const { quizzes } = routeApi.useLoaderData();
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVertical, setIsVertical] = useState(false);
  const formatNumber = (value: number) => String(value).padStart(2, '0');

  useLayoutEffect(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLLIElement>('li[data-active]');
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: 'instant' });
  }, [isVertical]);

  function slideTo(index: number, focusCard = false) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLLIElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2 });
    if (focusCard) card.querySelector('button')?.focus({ preventScroll: true });
  }

  function updatePosition() {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const card = child as HTMLLIElement;
      const delta = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (delta < distance) { distance = delta; nearest = index; }
    });
    setActiveIndex(nearest);
  }

  return (
    <Wrapper>
      <div className="selection-heading">
        <h1>Pick your next palace!</h1>
        {quizzes.length > 0 && (
          <LayoutToggle role="group" aria-label="Card orientation">
            <button type="button" aria-pressed={!isVertical} aria-controls="quiz-carousel" onClick={() => setIsVertical(false)}>Horizontal</button>
            <button type="button" aria-pressed={isVertical} aria-controls="quiz-carousel" onClick={() => setIsVertical(true)}>Vertical</button>
          </LayoutToggle>
        )}
      </div>
      {quizzes.length ? (
        <section className="quiz-selection" aria-label="Quiz selection" aria-roledescription="carousel" onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            slideTo(Math.max(0, Math.min(quizzes.length - 1, activeIndex + (event.key === 'ArrowRight' ? 1 : -1))), true);
          }
        }}>
          <Carousel $vertical={isVertical} ref={trackRef} id="quiz-carousel" onScroll={updatePosition}>
            {quizzes.map((quiz, index) => (
              <li key={quiz.id} data-active={index === activeIndex || undefined}>
                <QuizCard
                  type="button"
                  $active={index === activeIndex}
                  $vertical={isVertical}
                  data-long-title={quiz.title.length > 48 || undefined}
                  aria-label={`Open ${quiz.title}`}
                  onFocus={() => slideTo(index)}
                  onClick={() => navigate({ to: '/quiz/$quizID', params: { quizID: String(quiz.id) } })}
                >
                  <svg className="card-art" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                    <path d={spiral} fill="none" stroke="var(--red)" strokeWidth="49" />
                  </svg>
                  <span className="quiz-index" aria-hidden="true">{formatNumber(index + 1)}</span>
                  <CutoutTitle title={quiz.title} />
                  <span className="quiz-bottom"><span className="quiz-action">Open quiz</span><span className="quiz-arrow" aria-hidden="true">↗</span></span>
                </QuizCard>
              </li>
            ))}
          </Carousel>
          {quizzes.length > 1 && (
            <CarouselControls>
              <button type="button" aria-label="Previous quiz" aria-controls="quiz-carousel" disabled={activeIndex === 0} onClick={() => slideTo(activeIndex - 1)}>←</button>
              <span aria-live="polite" aria-atomic="true">{formatNumber(activeIndex + 1)} <span className="total">/ {formatNumber(quizzes.length)}</span></span>
              <button type="button" aria-label="Next quiz" aria-controls="quiz-carousel" disabled={activeIndex === quizzes.length - 1} onClick={() => slideTo(activeIndex + 1)}>→</button>
            </CarouselControls>
          )}
        </section>
      ) : (
        <div className="empty-state"><h2>No quizzes yet.</h2><p>Your quizzes will appear here when they’re added.</p></div>
      )}
    </Wrapper>
  );
}
