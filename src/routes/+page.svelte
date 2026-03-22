<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { questions } from "$lib/data/questions";

  const scaleDescriptions = [
    { value: 1, label: "Совершенно не обо мне" },
    { value: 2, label: "В основном неверно" },
    { value: 3, label: "Скорее верно, чем неверно" },
    { value: 4, label: "Верно в небольшой степени" },
    { value: 5, label: "В основном верно" },
    { value: 6, label: "Идеально описывает меня" },
  ] as const;
</script>

<section class="grid gap-8 py-8 md:gap-10 md:py-12">
  <div class="grid gap-4">
    <div class="grid gap-4">
      <h1 class="m-0 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl 2xl:text-5xl">
        Опросник жизненных паттернов
      </h1>

      <p class="m-0 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base 2xl:text-lg">
        Короткий опросник из {questions.length} утверждений. Для каждого утверждения
        нужно поставить две оценки: какой была ситуация в детстве и насколько это
        похоже на вас сейчас.
      </p>

      <div class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
        <span class="font-medium text-foreground">Источник:</span>
        <span> Книга Джеффри Янга - Прочь из замкнутого книга</span>
      </div>
    </div>
  </div>
  <h2 class="m-0 text-xl font-semibold">Как читать шкалу</h2>
  <div class="grid gap-4 rounded-(--radius) border bg-card p-4 text-card-foreground">
    <div class="grid gap-3">

      <ul class="m-0 grid gap-1 pl-5 text-sm leading-7 text-muted-foreground sm:text-base">
        {#each scaleDescriptions as item}
          <li>
            <span class="font-medium text-foreground">{item.value}</span>
            — {item.label}
          </li>
        {/each}
      </ul>
    </div>
  </div>

    <div class="flex flex-wrap justify-center gap-3">
      <Button
        href="/questionnaire"
        size="lg"
        class="h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base"
      >
        Начать опрос
      </Button>
    </div>
</section>
