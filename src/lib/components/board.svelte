<script lang="ts">
	import Line from './line.svelte';
	import { ROWS_COUNT } from './utils/game-logic';

	export let answer = '';
	export let entries: string[] = [];
	$: currentRow = entries.length - 1;
</script>

<div class="flex flex-col gap-2">
	{#each Array.from({ length: ROWS_COUNT }, (_, ind) => ind) as row}
		<Line
			entry={entries[row]}
			{answer}
			current={currentRow === row}
			done={row < entries.length - 1}
		/>
	{/each}
</div>
