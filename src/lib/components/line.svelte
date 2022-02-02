<script lang="ts">
	import Letter from './letter.svelte';

	export let entry = '';
	export let answer = '';
	export let current = false;
	export let done: boolean;
</script>

<div class="flex gap-2">
	{#each [0, 1, 2, 3, 4] as index}
		<Letter letter={(entry && entry[index]) || ''} {answer} {current} {index} {done} />
	{/each}
</div>
