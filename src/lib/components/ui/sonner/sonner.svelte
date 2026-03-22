<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";
	import { HugeiconsIcon } from "@hugeicons/svelte"
	import { Loading03Icon } from '@hugeicons/core-free-icons';
	import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
	import { MultiplicationSignCircleIcon } from '@hugeicons/core-free-icons';
	import { InformationCircleIcon } from '@hugeicons/core-free-icons';
	import { Alert02Icon } from '@hugeicons/core-free-icons';

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
	toastOptions={{
		class: "border-border bg-popover text-popover-foreground",
		descriptionClass: "text-sm text-foreground/80",
		classes: {
			title: "text-sm font-medium text-popover-foreground",
			content: "gap-1.5",
			description: "text-sm leading-6 text-foreground/80"
		}
	}}
	{...restProps}
>
	{#snippet loadingIcon()}
		<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} class="size-4 animate-spin" />
	{/snippet}
	{#snippet successIcon()}
		<HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} class="size-4" />
	{/snippet}
	{#snippet errorIcon()}
		<HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} class="size-4" />
	{/snippet}
	{#snippet infoIcon()}
		<HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} class="size-4" />
	{/snippet}
	{#snippet warningIcon()}
		<HugeiconsIcon icon={Alert02Icon} strokeWidth={2} class="size-4" />
	{/snippet}
</Sonner>

<style>
	:global(.toaster [data-sonner-toast]) {
		background: var(--color-popover) !important;
		border-color: var(--color-border) !important;
		color: var(--color-popover-foreground) !important;
	}

	:global(.toaster [data-title]) {
		color: var(--color-popover-foreground) !important;
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.4;
	}

	:global(.toaster [data-description]) {
		color: color-mix(in srgb, var(--color-popover-foreground) 82%, transparent) !important;
		font-size: 0.95rem;
		line-height: 1.6;
		opacity: 1 !important;
	}
</style>
