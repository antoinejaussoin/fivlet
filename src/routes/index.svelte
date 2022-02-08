<script lang="ts">
	import Alert from '$lib/alerts/alert.svelte';
	import Board from '$lib/components/board.svelte';
	import Entries from '$lib/components/entries.svelte';
	import { getAnswers } from '$lib/words/get-words';
	import Header from '../lib/components/header.svelte';
	import { _, locale } from 'svelte-i18n';
	import LanguagePicker from '$lib/i18n/language-picker.svelte';
	import { onMount } from 'svelte';

	let possibleAnswers: string[];
	let entries = [''];
	let answer = '';

	$: {
		async function changeLocale() {
			possibleAnswers = await getAnswers($locale);
			entries = [''];
		}
		changeLocale();
	}
	$: answer = possibleAnswers
		? possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)]
		: '';

	onMount(async () => {});

	function handleChange(evt: CustomEvent<string[]>) {
		entries = evt.detail;
	}

	function handleRefresh() {
		possibleAnswers = possibleAnswers;
		entries = [''];
	}
</script>

<svelte:head>
	<title>{$_('home.title')}</title>
</svelte:head>

<section>
	{process.env.NODE_ENV === 'development' ? answer : ''}
	<div class="fixed top-3 right-3">
		<LanguagePicker
			value={$locale}
			on:locale-changed={(e) => {
				locale.set(e.detail);
			}}
		/>
	</div>
	<div class="mb-8 flex flex-col items-center justify-center">
		<Header />
		<Alert />
		<Board {answer} {entries} />
	</div>

	<Entries on:change={handleChange} on:refresh={handleRefresh} {entries} {answer} />
</section>

<style>
</style>
