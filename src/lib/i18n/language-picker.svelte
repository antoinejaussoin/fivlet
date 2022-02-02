<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let value = 'en';
	const dispatch = createEventDispatcher();
	const switchLocale: svelte.JSX.FormEventHandler<HTMLSelectElement> = (event) => {
		event.preventDefault();
		dispatch<string>('locale-changed', event.currentTarget.value);
	};
</script>

<div class="choose-locale">
	<div class="select">
		<select value={value.slice(0, 2)} on:change={switchLocale}>
			<option value="en">English</option>
			<option value="fr">Français</option>
		</select>
	</div>
</div>

<style>
	.choose-locale {
		display: flex;
		justify-content: center;
	}
	.select {
		margin: 0 1rem 1rem;
	}
</style>
