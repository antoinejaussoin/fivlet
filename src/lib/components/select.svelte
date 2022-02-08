<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import clickOutside from 'svelte-outside-click';

	type T = $$Generic;
	interface $$Slots {
		default: {
			value: T;
			options: T[];
		};
		display: {
			item: T | undefined;
		};
		option: {
			option: T;
			selected: boolean;
		};
	}

	let clazz: string | undefined = undefined;
	let open = false;

	export let label: string | undefined = undefined;
	export let value: T;
	export let options: T[] = [];
	export { clazz as class };

	const dispatch = createEventDispatcher<{ select: T }>();

	function handleOutsideClick() {
		open = false;
	}

	function handleSelection(option: T) {
		dispatch('select', option);
		open = false;
	}
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class={clazz}>
	{#if label}
		<label for="listbox-label" aria-label={label} class="block text-sm font-medium text-gray-700"
			>{label}</label
		>
	{/if}
	<div class="relative" use:clickOutside={handleOutsideClick}>
		<button
			type="button"
			class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			aria-haspopup="listbox"
			aria-expanded="true"
			id="listbox-label"
			on:click={() => (open = true)}
		>
			<slot name="display" item={value}>
				<span class="flex items-center">
					<span class="ml-3 block truncate">
						{JSON.stringify(value)}
					</span>
				</span>
			</slot>

			<span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
				<!-- Heroicon name: solid/selector -->
				<svg
					class="h-5 w-5 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>

		<!--
		Select popover, show/hide based on select state.

		Entering: ""
			From: ""
			To: ""
		Leaving: "transition ease-in duration-100"
			From: "opacity-100"
			To: "opacity-0"
	-->
		{#if open}
			<ul
				class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
			>
				{#each options as option}
					<!--
			Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

			Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
		-->
					<li
						class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100"
						id="listbox-option-0"
						role="option"
						on:click={() => handleSelection(option)}
					>
						<slot name="option" {option} selected={option === value}>
							<div class="flex items-center">
								<span class="ml-3 block truncate font-normal">
									{JSON.stringify(option)}
								</span>
							</div>
						</slot>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
