<script lang="ts">
	import Select from '$lib/components/select.svelte';
	import { createEventDispatcher } from 'svelte';
	import fr from 'svg-country-flags/png100px/fr.png';
	import en from 'svg-country-flags/png100px/gb.png';
	export let value = 'en';
	const dispatch = createEventDispatcher<{ 'locale-changed': string }>();

	type Language = {
		name: string;
		value: string;
		icon: string;
	};

	const options: Language[] = [
		{ name: 'English', value: 'en', icon: en },
		{ name: 'Français', value: 'fr', icon: fr }
	];
	$: optionValue = options.find((x) => x.value === value.slice(0, 2));
</script>

<Select
	value={optionValue}
	class="w-40"
	{options}
	on:select={(opt) => dispatch('locale-changed', opt.detail.value)}
>
	<div slot="display" let:item>
		<span class="flex items-center">
			<img src={item.icon} alt={item.name} class="h-6 w-6 flex-shrink-0 rounded-full" />
			<span class="ml-3 block truncate">
				{item.name}
			</span>
		</span>
	</div>
	<div slot="option" let:option let:selected>
		<div class="flex items-center">
			<img src={option.icon} alt={option.name} class="h-6 w-6 flex-shrink-0 rounded-full" />
			<span class="ml-3 block truncate font-normal" class:selected>
				{option.name}
			</span>
		</div>
	</div>
</Select>

<style>
	.selected {
		@apply font-semibold;
	}
</style>
