<script lang="ts">
  import Questionnaire from '$lib/components/Questionnaire.svelte';
  import { questions } from '$lib/data/questions';
</script>

<Questionnaire {questions} />
