<script lang="ts">
	import '../app.css';
	import { waitLocale, locale } from 'svelte-i18n';
	import '../lib/i18n/init';

	// locale.set('en');

	export async function preload() {
		return waitLocale();
	}
</script>

<main>
	<slot />
</main>
