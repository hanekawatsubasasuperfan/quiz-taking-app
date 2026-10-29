import assert from 'node:assert/strict';
import { test } from 'node:test';
import { paginateNotes, questionLabel } from '../src/Components/ReviewNotebook/pagination.ts';

const note = (id, question, answer = '') => ({ id, number: id, question, answer, continued: false });
const measure = item => Math.ceil(Array.from(questionLabel(item)).length / 30) * 32
  + Math.ceil(Array.from(item.answer).length / 30) * 32 + 24;

test('empty and single-sheet results always have a spare page', () => {
  assert.deepEqual(paginateNotes([], 300, measure), [[], []]);
  const notes = [note(1, 'One question', 'One answer')];
  assert.deepEqual(paginateNotes(notes, 300, measure), [notes, []]);
});

test('whole notes stay together when they fit a fresh page', () => {
  const notes = [note(1, 'First', 'Answer'), note(2, 'Second', 'Answer'), note(3, 'Third', 'Answer')];
  const pages = paginateNotes(notes, 180, measure);
  assert.deepEqual(pages.map(page => page.map(item => item.id)), [[1, 2], [3]]);
  assert.ok(pages.flat().every(item => !item.continued));
});

test('overflow creates only the necessary pages, preserving exact-fit boundaries', () => {
  const notes = Array.from({ length: 7 }, (_, index) => note(index + 1, 'Question', 'Answer'));
  const pages = paginateNotes(notes, 176, measure);
  assert.deepEqual(pages.map(page => page.length), [2, 2, 2, 1]);
  assert.deepEqual(pages.flat(), notes);
});

test('long questions and answers continue without dropping text or breaking Unicode', () => {
  const notes = [note(1, 'A long question 🌙\n'.repeat(50), 'An answer with detail.\n'.repeat(60)),
    note(2, '字'.repeat(500), '🌟'.repeat(500)), note(3, 'Last note', 'Last answer')];
  const pages = paginateNotes(notes, 256, measure);
  assert.ok(pages.length > 2);
  assert.ok(pages.every(page => page.reduce((sum, item) => sum + measure(item), 0) <= 256));
  for (const original of notes) {
    const fragments = pages.flat().filter(item => item.id === original.id);
    assert.equal(fragments.map(item => item.question).join(''), original.question);
    assert.equal(fragments.map(item => item.answer).join(''), original.answer);
    assert.ok(fragments.slice(1).every(item => item.continued));
  }
});

test('resizing repaginates the same notes without changing their order or content', () => {
  const notes = Array.from({ length: 12 }, (_, index) => note(index + 1, `Question ${index}`, 'Useful review answer.'));
  const small = paginateNotes(notes, 180, measure);
  const large = paginateNotes(notes, 400, measure);
  assert.ok(small.length > large.length);
  assert.deepEqual(small.flat(), notes);
  assert.deepEqual(large.flat(), notes);
});
