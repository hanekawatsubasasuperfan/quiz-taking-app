import { useEffect, useMemo, useRef, useState } from 'react';
import ArrowIcon from '../ArrowIcon';
import { Book, PageControls, Sheet, TurningSheet } from './index.styles';
import { paginateNotes, questionLabel } from './pagination';
import type { ReviewNote } from './pagination';

interface Question { id: number; question: string; answer: string }
interface Turn { from: number; to: number; direction: 'next' | 'previous' }

export default function ReviewNotebook({ questions, marks }: { questions: Question[]; marks: Record<number, boolean> }) {
  const reviews = useMemo(() => questions.flatMap((question, index) => marks[question.id] === false
    ? [{ ...question, number: index + 1, continued: false }] : []), [questions, marks]);
  const correct = questions.filter(question => marks[question.id] === true).length;
  const percent = questions.length ? Math.round(correct / questions.length * 100) : 0;
  const [pages, setPages] = useState<ReviewNote[][]>([[], []]);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [turn, setTurn] = useState<Turn | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const probe = probeRef.current;
    if (!area || !probe) return;
    let disposed = false;
    let frame = 0;
    let previousPages = '';
    const measure = () => {
      if (disposed || !area.clientWidth || !area.clientHeight) return;
      const question = probe.querySelector<HTMLElement>('.review-question')!;
      const answer = probe.querySelector<HTMLElement>('.review-answer')!;
      const result = paginateNotes(reviews, area.clientHeight - 1, note => {
        question.textContent = questionLabel(note);
        answer.textContent = note.answer;
        return probe.getBoundingClientRect().height;
      });
      const signature = JSON.stringify(result);
      setReady(true);
      if (signature === previousPages) return;
      previousPages = signature;
      setPages(result);
      setPage(current => Math.min(current, result.length - 1));
      setTurn(null);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(() => { setReady(false); schedule(); });
    observer.observe(area);
    schedule();
    void document.fonts.ready.then(() => { if (!disposed) schedule(); });
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); };
  }, [reviews]);

  useEffect(() => {
    if (!turn) return;
    // Also complete if the browser suppresses animation events in a background tab.
    const timer = window.setTimeout(() => { setPage(turn.to); setTurn(null); }, 720);
    return () => window.clearTimeout(timer);
  }, [turn]);

  function turnPage(next: number) {
    if (!ready || turn || next < 0 || next >= pages.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPage(next);
      return;
    }
    setTurn({ from: page, to: next, direction: next > page ? 'next' : 'previous' });
  }

  function renderSheet(index: number, className?: string) {
    return (
      <Sheet className={className} aria-label={`Review notes, page ${index + 1}`}>
        <span className="binder-holes" aria-hidden="true"><i /><i /><i /></span>
        <header className="score-heading"><h1>{percent}%</h1><p>{correct}/{questions.length} questions correct</p></header>
        <div className="review-notes">
          <ul role="list">
            {pages[index]?.map((note, position) => (
              <li key={`${note.id}-${position}`} data-question-id={note.id} data-continued={note.continued || undefined}>
                <span className="note-marker" aria-hidden="true">{note.continued ? '↳' : '•'}</span>
                <p className="review-question">{questionLabel(note)}</p>
                <p className="review-answer">{note.answer}</p>
              </li>
            ))}
          </ul>
          {ready && index === 0 && reviews.length === 0 && <p className="empty-notes">No questions marked for review.</p>}
        </div>
        <footer className="sheet-number">{String(index + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}</footer>
      </Sheet>
    );
  }

  const basePage = turn?.direction === 'next' ? turn.to : page;
  return (
    <Book>
      <div className="book-status" role="status">{percent}%. {correct}/{questions.length} questions correct. {reviews.length} questions marked for review.</div>
      <div className="book-clip">
        <div className="book-stage" aria-busy={!ready || !!turn}>
          {renderSheet(basePage)}
          {turn && (
            <TurningSheet $direction={turn.direction} aria-hidden="true" data-page-turn={turn.direction}
              onAnimationEnd={event => { if (event.target === event.currentTarget) { setPage(turn.to); setTurn(null); } }}>
              {renderSheet(turn.direction === 'next' ? turn.from : turn.to, 'sheet-front')}
              <Sheet className="sheet-back" />
            </TurningSheet>
          )}
          <Sheet className="measurement-sheet" aria-hidden="true">
            <div className="review-notes" ref={areaRef}>
              <ul><li ref={probeRef}><p className="review-question" /><p className="review-answer" /></li></ul>
            </div>
          </Sheet>
        </div>
      </div>
      <PageControls aria-label="Review notebook pages">
        <button type="button" aria-label="Previous notes page" disabled={!ready || !!turn || page === 0} onClick={() => turnPage(page - 1)}><ArrowIcon direction="left" /><span className="button-label">Previous</span></button>
        <span className="page-count" aria-live="polite">Page {page + 1} of {pages.length}</span>
        <button type="button" aria-label="Next notes page" disabled={!ready || !!turn || page === pages.length - 1} onClick={() => turnPage(page + 1)}><span className="button-label">Next</span><ArrowIcon /></button>
      </PageControls>
    </Book>
  );
}
