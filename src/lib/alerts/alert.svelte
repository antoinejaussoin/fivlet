<script lang="ts">
	import { AlertData, message } from '../store';

	let currentMessage: AlertData | undefined;
	let handle: NodeJS.Timer;
	let removing: boolean = false;

	message.subscribe((v) => {
		currentMessage = v;

		if (handle) {
			clearInterval(handle);
			handle = null;
		}
		handle = setTimeout(() => {
			removing = true;
			handle = null;
			setTimeout(() => {
				currentMessage = undefined;
				removing = false;
			}, 1000);
		}, 5000);
	});
</script>

{#if currentMessage}
	<div
		class="alert"
		class:error={currentMessage.level === 'error'}
		class:warn={currentMessage.level === 'warn'}
		class:info={currentMessage.level === 'info'}
		class:success={currentMessage.level === 'success'}
		class:removing
	>
		{currentMessage.message}
	</div>
{/if}

<style>
	.alert {
		@apply fixed top-4 p-2 px-4 rounded;
	}

	.removing {
		animation: fadeOut 1s;
	}

	.error {
		@apply border-red-900 bg-red-400 text-red-900;
	}

	.warn {
		@apply border-orange-900 bg-orange-400 text-orange-900;
	}

	.info {
		@apply border-blue-900 bg-blue-400 text-blue-900;
	}

	.success {
		@apply border-green-900 bg-green-400 text-green-900;
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
