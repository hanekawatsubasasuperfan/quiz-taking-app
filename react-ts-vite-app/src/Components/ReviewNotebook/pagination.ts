export interface ReviewNote {
  id: number;
  number: number;
  question: string;
  answer: string;
  continued: boolean;
}

// Measure real rendered text, rather than assuming a fixed number of questions per page.
// Oversized notes are split without discarding words, newlines or Unicode characters.
export function paginateNotes(notes: ReviewNote[], height: number, measure: (note: ReviewNote) => number): ReviewNote[][] {
  const pages: ReviewNote[][] = [];
  let page: ReviewNote[] = [];
  let used = 0;
  const nextPage = () => {
    if (page.length) pages.push(page);
    page = [];
    used = 0;
  };

  function fittingPrefix(text: string, fits: (prefix: string) => boolean) {
    const characters = Array.from(text);
    let low = 0;
    let high = characters.length;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (fits(characters.slice(0, middle).join(''))) low = middle;
      else high = middle - 1;
    }
    let prefix = characters.slice(0, low).join('');
    if (low < characters.length) {
      // Prefer a word boundary when possible; a single long word can break anywhere.
      const boundary = prefix.search(/\s+\S*$/u);
      if (boundary > 0) prefix = prefix.slice(0, boundary + 1);
    }
    return prefix;
  }

  for (const note of notes) {
    let remaining = { ...note };
    let pending = true;
    while (pending) {
      const size = measure(remaining);
      if (used + size <= height) {
        page.push(remaining);
        used += size;
        pending = false;
        continue;
      }
      if (page.length) {
        nextPage();
        continue;
      }
      const question = fittingPrefix(remaining.question, prefix => measure({ ...remaining, question: prefix, answer: '' }) <= height);
      if (question.length < remaining.question.length) {
        // The notebook guarantees enough height for a line, even on narrow screens.
        const fragment = question || Array.from(remaining.question)[0]!;
        page.push({ ...remaining, question: fragment, answer: '' });
        remaining = { ...remaining, question: remaining.question.slice(fragment.length), continued: true };
      } else {
        const answer = fittingPrefix(remaining.answer, prefix => measure({ ...remaining, answer: prefix }) <= height);
        if (!question && !answer && remaining.answer) {
          const fragment = Array.from(remaining.answer)[0]!;
          page.push({ ...remaining, answer: fragment });
          remaining = { ...remaining, answer: remaining.answer.slice(fragment.length), continued: true };
        } else {
          page.push({ ...remaining, answer });
          remaining = { ...remaining, question: '', answer: remaining.answer.slice(answer.length), continued: true };
        }
        pending = remaining.answer.length > 0;
      }
      nextPage();
    }
  }
  nextPage();
  // A spare sheet keeps page turning available even for a perfect score or a short list.
  while (pages.length < 2) pages.push([]);
  return pages;
}

export function questionLabel(note: ReviewNote) {
  return note.question || `Question ${note.number} — answer continued`;
}
