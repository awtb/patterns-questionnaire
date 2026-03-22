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
      <h1
        class="m-0 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl 2xl:text-5xl"
      >
        Опросник, который помогает увидеть, какие поведенческие схемы тянутся из
        детства и как они проявляются в вашей жизни сейчас.
      </h1>

      <div
        class="grid gap-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base 2xl:text-lg"
      >
        <p class="m-0">
          У каждого утверждения две оценки: одна — про детство, вторая — про
          настоящее. Каждая оценка ставится по шкале от 1 до 6.
        </p>

        <div class="grid gap-2">
          <p class="m-0 font-medium text-foreground">Шкала ответов:</p>
          <ul class="m-0 grid gap-1 pl-5">
            {#each scaleDescriptions as item}
              <li>
                <span class="font-medium text-foreground">{item.value}</span>
                — {item.label}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div
    class="grid gap-4 rounded-[var(--radius)] border bg-card p-5 text-card-foreground"
  >
    <div class="grid gap-2">
      <h2 class="m-0 text-xl font-semibold">Как это проходит</h2>
      <p class="m-0 text-sm leading-7 text-muted-foreground sm:text-base">
        Вы читаете утверждение и выбираете, насколько оно откликается вам по
        шкале от 1 до 6 — отдельно для детства и отдельно для текущего периода.
        После прохождения всех вопросов вы получите автоматический результат по
        схемам.
      </p>
      <p class="m-0 text-sm leading-7 text-muted-foreground sm:text-base">
        В текущей версии опросника: {questions.length} утверждения, по две оценки
        на каждое.
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <Button
        href="/questionnaire"
        size="lg"
        class="h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base"
      >
        Начать опрос
      </Button>
    </div>
  </div>
</section>
