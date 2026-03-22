<script lang="ts">
  import QuestionCard from '$lib/components/QuestionCard.svelte';
  import { questions } from '$lib/data/questions';

  const currentQuestion = questions[0];
</script>

<QuestionCard question={currentQuestion} current={1} total={questions.length} />
