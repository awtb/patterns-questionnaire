<script lang="ts">
  import type { AnswerScaleValue } from '$lib/components/AnswerScale.svelte';
  import { goto } from '$app/navigation';
  import QuestionCard from '$lib/components/QuestionCard.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Progress } from '$lib/components/ui/progress/index.js';
  import { questionnaireResult } from '$lib/stores/questionnaire';
  import { toast } from 'svelte-sonner';
  import type { AnswerValue, Question, QuestionAnswer } from '$lib/types/question';

  let { questions }: { questions: Question[] } = $props();

  type QuestionAnswerDraft = {
    childhood: AnswerScaleValue;
    current: AnswerScaleValue;
  };

  let currentIndex = $state(0);
  let answersByQuestionId = $state<Partial<Record<number, QuestionAnswer>>>({});
  let draftAnswersByQuestionId = $state<Partial<Record<number, QuestionAnswerDraft>>>({});

  const totalQuestions = $derived(questions.length);
  const currentQuestion = $derived(questions[currentIndex]);
  const currentNumber = $derived(currentIndex + 1);
  const isLastQuestion = $derived(currentIndex === totalQuestions - 1);
  const progressValue = $derived((currentNumber / totalQuestions) * 100);
  const currentAnswers = $derived(
    draftAnswersByQuestionId[currentQuestion.id] ??
      answersByQuestionId[currentQuestion.id] ?? { childhood: null, current: null }
  );

  function goToPrevious() {
    if (currentIndex === 0) return;
    currentIndex -= 1;
  }

  function goToNext() {
    if (currentAnswers.childhood === null || currentAnswers.current === null) {
      toast.error('Ответьте на вопрос полностью', {
        description: 'Выберите значения и для детства, и для текущего периода.'
      });
      return;
    }

    answersByQuestionId = {
      ...answersByQuestionId,
      [currentQuestion.id]: {
        childhood: currentAnswers.childhood,
        current: currentAnswers.current
      }
    };

    if (isLastQuestion) {
      questionnaireResult.set({
        questions,
        answersByQuestionId: {
          ...answersByQuestionId,
          [currentQuestion.id]: {
            childhood: currentAnswers.childhood,
            current: currentAnswers.current
          }
        } as Record<number, QuestionAnswer>
      });

      goto('/results');
      return;
    }

    currentIndex += 1;
  }

  function updateChildhoodAnswer(value: AnswerValue) {
    draftAnswersByQuestionId = {
      ...draftAnswersByQuestionId,
      [currentQuestion.id]: {
        ...currentAnswers,
        childhood: value
      }
    };
  }

  function updateCurrentAnswer(value: AnswerValue) {
    draftAnswersByQuestionId = {
      ...draftAnswersByQuestionId,
      [currentQuestion.id]: {
        ...currentAnswers,
        current: value
      }
    };
  }
</script>

<section class="grid gap-6 py-8 md:py-10">
  <div class="grid gap-3">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="grid gap-1">
        <h1 class="m-0 text-2xl font-semibold sm:text-3xl">Опросник</h1>
        <p class="m-0 text-sm text-muted-foreground sm:text-base">
          Вопрос {currentNumber} из {totalQuestions}
        </p>
      </div>

      <span class="text-sm text-muted-foreground sm:text-base">
        {Math.round(progressValue)}%
      </span>
    </div>

    <Progress value={progressValue} class="h-2" />
  </div>

  <QuestionCard
    question={currentQuestion}
    current={currentNumber}
    total={totalQuestions}
    childhoodAnswer={currentAnswers.childhood}
    currentAnswer={currentAnswers.current}
    onChildhoodAnswerChange={updateChildhoodAnswer}
    onCurrentAnswerChange={updateCurrentAnswer}
  />

  <div class="flex flex-wrap justify-between gap-3">
    <Button
      variant="outline"
      size="lg"
      class="h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base"
      onclick={goToPrevious}
      disabled={currentIndex === 0}
    >
      Назад
    </Button>

    <Button
      size="lg"
      class="h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base"
      onclick={goToNext}
    >
      {isLastQuestion ? 'К результатам' : 'Далее'}
    </Button>
  </div>
</section>
