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
			<span class="flex items-center">
				<img
					src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					alt=""
					class="h-6 w-6 flex-shrink-0 rounded-full"
				/>
				<span class="ml-3 block truncate">
					{item.name}
				</span>
			</span>
		</div>
		<div slot="option" let:option>
			<div class="flex items-center">
				<img
					src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					alt=""
					class="h-6 w-6 flex-shrink-0 rounded-full"
				/>
				<!-- Selected: "font-semibold", Not Selected: "font-normal" -->
				<span class="ml-3 block truncate font-normal">
					{option.name}
				</span>
			</div>
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
