<script lang="ts">
  import { base } from '$app/paths';
  import { Alert02Icon, CheckmarkCircle02Icon, Fire02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';
  import { HugeiconsIcon } from '@hugeicons/svelte';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { schemaDescriptions } from '$lib/data/schema-descriptions';
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '$lib/components/ui/table';
  import type { QuestionnaireResult } from '$lib/stores/questionnaire';
  import { SchemaFlag, type SchemaKey } from '$lib/types/question';

  let { result }: { result: QuestionnaireResult } = $props();

  function resolveSchemaFlag(score: number): SchemaFlag {
    if (score >= 20) return SchemaFlag.StronglyExpressed;
    if (score >= 15) return SchemaFlag.Expressed;
    if (score >= 10) return SchemaFlag.Potential;
    return SchemaFlag.None;
  }

  const flagMeta = {
    [SchemaFlag.None]: {
      label: 'Не выражена',
      icon: CheckmarkCircle02Icon,
      className: 'text-muted-foreground'
    },
    [SchemaFlag.Potential]: {
      label: 'Потенциально есть',
      icon: InformationCircleIcon,
      className: 'text-sky-600 dark:text-sky-400'
    },
    [SchemaFlag.Expressed]: {
      label: 'Выражена',
      icon: Alert02Icon,
      className: 'text-amber-600 dark:text-amber-400'
    },
    [SchemaFlag.StronglyExpressed]: {
      label: 'Сильно выражена',
      icon: Fire02Icon,
      className: 'text-rose-600 dark:text-rose-400'
    }
  } as const;

  const groupedResults = $derived(
    Object.values(
      result.questions.reduce<Record<string, {
        key: SchemaKey;
        label: string;
        childhoodSum: number;
        currentSum: number;
        count: number;
      }>>((acc, question) => {
        const answer = result.answersByQuestionId[question.id];

        if (!answer) return acc;

        const existing = acc[question.schemaKey];

        if (existing) {
          existing.childhoodSum += answer.childhood;
          existing.currentSum += answer.current;
          existing.count += 1;
          return acc;
        }

        acc[question.schemaKey] = {
          key: question.schemaKey,
          label: schemaDescriptions[question.schemaKey].title,
          childhoodSum: answer.childhood,
          currentSum: answer.current,
          count: 1
        };

        return acc;
      }, {})
    ).map((item) => ({
      ...item,
      summary: item.childhoodSum + item.currentSum,
      flag: resolveSchemaFlag(item.childhoodSum + item.currentSum),
      childhoodAverage: (item.childhoodSum / item.count).toFixed(1),
      currentAverage: (item.currentSum / item.count).toFixed(1)
    })).sort((a, b) => b.summary - a.summary)
  );
</script>

<section class="grid gap-6 py-8 md:py-10">
  <div class="grid gap-3">
    <h1 class="m-0 text-2xl font-semibold sm:text-3xl">Результаты</h1>
    <p class="m-0 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
      Ниже показана краткая сводка по ловушкам на основе ваших ответов. 
    </p>
  </div>

  <div class="grid gap-4 rounded-(--radius) border bg-card p-5 text-card-foreground">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="grid gap-1">
        <h2 class="m-0 text-lg font-semibold sm:text-xl">Сводная таблица</h2>
        <p class="m-0 text-sm text-muted-foreground">
          {result.questions.length} вопросов, {groupedResults.length} схем в отчёте
        </p>
      </div>
    </div>

    <div class="grid gap-2 rounded-(--radius) border bg-background p-4">
      <p class="m-0 text-sm font-medium text-foreground">Флаг — описание</p>

      <div class="grid gap-2 text-sm text-muted-foreground">
        {#each [SchemaFlag.Potential, SchemaFlag.Expressed, SchemaFlag.StronglyExpressed] as flag}
          {@const meta = flagMeta[flag]}
          <div class="flex flex-wrap items-center gap-2">
            <span class={`inline-flex items-center gap-2 ${meta.className}`}>
              <HugeiconsIcon icon={meta.icon} size={16} strokeWidth={1.9} />
              <span class="text-foreground">{meta.label}</span>
            </span>
            <span>
              —
              {flag === SchemaFlag.Potential
                ? 'сумма от 10'
                : flag === SchemaFlag.Expressed
                  ? 'сумма от 15'
                  : 'сумма от 20'}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <Table>
      <TableCaption class="caption-top mt-0 mb-4 text-left">
        <span class="block text-sm font-medium text-foreground">Описание ловушек</span>
        <span class="mt-1 block text-sm text-muted-foreground">
          Нажмите на название ловушки в таблице, чтобы перейти к её описанию ниже.
        </span>
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Ловушка</TableHead>
          <TableHead class="text-center">Сумма</TableHead>
          <TableHead class="text-center">Среднее в детстве</TableHead>
          <TableHead class="text-center">Среднее сейчас</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {#each groupedResults as item}
          {@const meta = flagMeta[item.flag]}
          <TableRow>
            <TableCell class="font-medium">
              <a
                href={`#schema-description-${item.key}`}
                class={`inline-flex items-center gap-2 rounded-sm transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 ${meta.className}`}
              >
                <HugeiconsIcon icon={meta.icon} size={16} strokeWidth={1.9} />
                <span>{item.label}</span>
              </a>
            </TableCell>
            <TableCell class="text-center text-muted-foreground">{item.summary}</TableCell>
            <TableCell class="text-center">{item.childhoodAverage}</TableCell>
            <TableCell class="text-center">{item.currentAverage}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div class="grid gap-4">
    {#each groupedResults as item}
      {@const meta = flagMeta[item.flag]}
      <article
        id={`schema-description-${item.key}`}
        class="grid gap-3 rounded-(--radius) border bg-card p-5 text-card-foreground"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h3 class="m-0 text-lg font-semibold sm:text-xl">
            <span class={`inline-flex items-center gap-2 ${meta.className}`}>
              <HugeiconsIcon icon={meta.icon} size={18} strokeWidth={1.9} />
              <span>{schemaDescriptions[item.key].title}</span>
            </span>
          </h3>
          <Badge variant="secondary" class="h-auto px-3 py-1 text-xs sm:text-sm">
            Сумма: {item.summary}
          </Badge>
        </div>

        <div class="grid gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
          {#each schemaDescriptions[item.key].paragraphs as paragraph}
            <p class="m-0">{paragraph}</p>
          {/each}
        </div>
      </article>
    {/each}
  </div>

  <div class="flex flex-wrap gap-3">
    <Button href={`${base}/questionnaire`} variant="outline" size="lg" class="h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base">
      Пройти ещё раз
    </Button>
    <Button href={`${base}/`} size="lg" class="h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base">
      На главную
    </Button>
  </div>
</section>
