<script lang="ts">
  import AnswerScale, { type AnswerScaleValue } from '$lib/components/AnswerScale.svelte';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import type { Question } from '$lib/types/question';

  let {
    question,
    current = 1,
    total = 1,
    childhoodAnswer = null,
    currentAnswer = null,
    onChildhoodAnswerChange,
    onCurrentAnswerChange
  }: {
    question: Question;
    current?: number;
    total?: number;
    childhoodAnswer?: AnswerScaleValue;
    currentAnswer?: AnswerScaleValue;
    onChildhoodAnswerChange: (value: Exclude<AnswerScaleValue, null>) => void;
    onCurrentAnswerChange: (value: Exclude<AnswerScaleValue, null>) => void;
  } = $props();

  const schemaLabels: Record<Question['schemaKey'], string> = {
    abandonment: 'Покинутость',
    mistrust_abuse: 'Недоверие и ожидание жестокого обращения',
    vulnerability: 'Уязвимость',
    dependence: 'Зависимость',
    emotional_deprivation: 'Эмоциональная депривация',
    social_exclusion: 'Социальное исключение',
    defectiveness: 'Дефективность',
    failure: 'Неуспешность',
    subjugation: 'Подчинение',
    unrelenting_standards: 'Жёсткие стандарты',
    entitlement: 'Избранность'
  };
</script>

<article class="grid gap-4 border bg-card p-5 text-card-foreground 2xl:gap-5 2xl:p-6">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <span class="text-sm text-muted-foreground 2xl:text-base">Вопрос {current} из {total}</span>
    <Badge
      variant="secondary"
      class="h-auto px-3 py-1 text-xs sm:text-sm 2xl:px-4 2xl:py-1.5 2xl:text-base"
    >
      {schemaLabels[question.schemaKey]}
    </Badge>
  </div>

  <div class="py-1">
    <p class="m-0 text-lg leading-relaxed 2xl:text-[1.375rem] 2xl:leading-9">{question.text}</p>
  </div>

  <div class="grid gap-4 border-t pt-1 2xl:gap-5">
    <span class="text-sm text-muted-foreground 2xl:text-base">
      Оцените, насколько это похоже на вас.
    </span>
    <AnswerScale
      label="В детстве"
      value={childhoodAnswer}
      onChange={onChildhoodAnswerChange}
    />
    <AnswerScale
      label="Сейчас"
      value={currentAnswer}
      onChange={onCurrentAnswerChange}
    />
  </div>
</article>
