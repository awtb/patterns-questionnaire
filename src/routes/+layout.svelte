<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { browser } from '$app/environment';
  import { HugeiconsIcon } from '@hugeicons/svelte';
  import { CheckListIcon, Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons';

  let { children } = $props();

  type ThemeMode = 'light' | 'dark';

  const themeOptions: Array<{ value: ThemeMode; label: string; icon: typeof Sun01Icon }> = [
    { value: 'light', label: 'Light', icon: Sun01Icon },
    { value: 'dark', label: 'Dark', icon: Moon02Icon }
  ];

  let theme = $state<ThemeMode>('light');

  function applyTheme(value: ThemeMode) {
    if (!browser) return;

    theme = value;
    document.documentElement.classList.toggle('dark', value === 'dark');
    window.localStorage.setItem('theme-preference', value);
  }

  if (browser) {
    const savedTheme = window.localStorage.getItem('theme-preference');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme((savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : systemTheme) as ThemeMode);
  }
</script>

<svelte:head>
  <title>Schema Questionnaire</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
  <header class="navbar">
    <a class="brand" href="/">
      <span class="brand-icon" aria-hidden="true">
        <HugeiconsIcon icon={CheckListIcon} size={18} strokeWidth={1.8} />
      </span>
      Опросник из книги Джеффри. Я.  
    </a>

    <div class="theme-switcher" aria-label="Theme switcher">
      {#each themeOptions as option}
        <button
          type="button"
          class:active={theme === option.value}
          aria-pressed={theme === option.value}
          aria-label={option.label}
          title={option.label}
          onclick={() => applyTheme(option.value)}
        >
          <HugeiconsIcon icon={option.icon} size={18} strokeWidth={1.8} />
        </button>
      {/each}
    </div>
  </header>

  <main class="page-content">
    {@render children()}
  </main>
</div>
