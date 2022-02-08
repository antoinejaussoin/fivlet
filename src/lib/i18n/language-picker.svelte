<script lang="ts">
	import Select from '$lib/components/select.svelte';
	import { createEventDispatcher } from 'svelte';
	export let value = 'en';
	const dispatch = createEventDispatcher<{ 'locale-changed': string }>();
	const switchLocale: svelte.JSX.FormEventHandler<HTMLSelectElement> = (event) => {
		event.preventDefault();
		dispatch('locale-changed', event.currentTarget.value);
	};

	type Language = {
		name: string;
		value: string;
	};

	const options: Language[] = [
		{ name: 'English', value: 'en' },
		{ name: 'Français', value: 'fr' }
	];
	$: optionValue = options.find((x) => x.value === value.slice(0, 2));
</script>

<div class="choose-locale">
	<div class="select">
		<select value={value.slice(0, 2)} on:change={switchLocale}>
			<option value="en">English</option>
			<option value="fr">Français</option>
		</select>
	</div>

	<Select
		value={optionValue}
		{options}
		on:select={(opt) => dispatch('locale-changed', opt.detail.value)}
	>
		<div slot="display" let:item>
			{item.name}
		</div>
		<div slot="option" let:option>
			{option.name}
		</div>
	</Select>
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
