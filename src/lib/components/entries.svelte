<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { message } from '../store';
	import getKeyboard from './utils/get-keyboard';
	import { hasWon, processKey } from './utils/game-logic';
	import { _, locale } from 'svelte-i18n';
	import { getValidWords } from '../words/get-words';
	import Refresh from './refresh-icon.svelte';

	export let entries: string[] = [];
	export let answer: string;

	$: keyboard = getKeyboard(entries, answer, [
		$_('keyboard.first'),
		$_('keyboard.second'),
		$_('keyboard.third')
	]);

	$: won = hasWon(entries, answer);

	async function pressKey(key: string) {
		const words = await getValidWords($locale);
		const result = processKey(words, entries, answer, key);
		if (result.alert) {
			message.set({
				level: result.alert.level,
				message: $_(result.alert.message, { values: result.alert.parameters })
			});
		}
		dispatchChange('change', result.entries);
	}

	function handleKeypress(evt: KeyboardEvent) {
		pressKey(evt.key);
	}

	const dispatchChange = createEventDispatcher<{ change: string[] }>();
	const dispatchRefresh = createEventDispatcher();
</script>

<svelte:window on:keydown={handleKeypress} />

<div class="relative flex flex-col gap-2">
	{#each keyboard as row}
		<div class="flex justify-center gap-2">
			{#each row as key}
				<div
					class="flex h-8 w-8 items-center justify-center border-2"
					class:placed={key.status === 'placed'}
					class:misplaced={key.status === 'misplaced'}
					class:wrong={key.status === 'not-there'}
					class:special={key.key.length > 1}
					on:click={() => pressKey(key.key)}
				>
					{key.icon || key.key}
				</div>
			{/each}
		</div>
	{/each}
	{#if won}
		<div
			on:click={() => dispatchRefresh('refresh')}
			class="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center text-6xl text-green-800 backdrop-blur-sm"
		>
			<Refresh />
		</div>
	{/if}
</div>

<style>
	.placed {
		@apply bg-green-800 text-white;
	}

	.misplaced {
		@apply bg-yellow-600 text-white;
	}

	.wrong {
		@apply bg-gray-500 text-white;
	}

	.special {
		@apply w-12 bg-blue-300;
	}
</style>
