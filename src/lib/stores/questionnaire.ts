import { writable } from 'svelte/store';
import type { Question, QuestionAnswer } from '$lib/types/question';

export type QuestionnaireResult = {
  questions: Question[];
  answersByQuestionId: Record<number, QuestionAnswer>;
};

export const questionnaireResult = writable<QuestionnaireResult | null>(null);
