<script lang="ts">
  import { base } from '$app/paths';
  import QuestionnaireResults from '$lib/components/QuestionnaireResults.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import { questionnaireResult } from '$lib/stores/questionnaire';
</script>

{#if $questionnaireResult}
  <QuestionnaireResults result={$questionnaireResult} />
{:else}
  <section class="grid gap-4 py-8 md:py-10">
    <div class="grid gap-2 rounded-(--radius) border bg-card p-5 text-card-foreground">
      <h1 class="m-0 text-2xl font-semibold sm:text-3xl">Результаты недоступны</h1>
      <p class="m-0 text-sm leading-7 text-muted-foreground sm:text-base">
        Сначала пройдите опросник, чтобы увидеть страницу результатов.
      </p>

      <div class="mt-2 flex flex-wrap gap-3">
        <Button href={`${base}/questionnaire`} size="lg" class="h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base">
          Перейти к опроснику
        </Button>
      </div>
    </div>
  </section>
{/if}
