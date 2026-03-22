<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';

  export type AnswerScaleValue = 1 | 2 | 3 | 4 | 5 | 6 | null;

  type Props = {
    label: string;
    value: AnswerScaleValue;
    onChange: (value: Exclude<AnswerScaleValue, null>) => void;
  };

  let { label, value, onChange }: Props = $props();

  const options = [1, 2, 3, 4, 5, 6] as const;
</script>

<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 2xl:gap-6">
  <div class="min-w-24 text-sm font-medium text-foreground 2xl:min-w-32 2xl:text-base">
    {label}
  </div>

  <div class="flex flex-wrap gap-2 2xl:gap-3">
    {#each options as option}
      <Button
        variant={value === option ? 'default' : 'outline'}
        size="default"
        class="min-w-9 xl:min-w-11 xl:h-9 xl:px-3 xl:text-sm 2xl:min-w-14 2xl:h-11 2xl:px-4 2xl:text-base"
        type="button"
        onclick={() => onChange(option)}
      >
        {option}
      </Button>
    {/each}
  </div>
</div>
