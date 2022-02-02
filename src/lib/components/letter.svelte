<script lang="ts">
	export let letter: string;
	export let answer: string;
	export let index: number;
	export let current: boolean;
	export let done: boolean;

	function isPlaced(
		current: boolean,
		letter: string,
		answer: string,
		index: number
	): boolean | undefined {
		const letterAnswer = answer[index];
		if (!letter || current) {
			return undefined;
		}
		if (letter === letterAnswer) {
			return true;
		}
		if (answer.includes(letter)) {
			return false;
		}
		return undefined;
	}

	$: placed = isPlaced(current, letter, answer, index);
</script>

<div
	class="border-2 border-gray-200 w-16 h-16 flex items-center justify-center text-3xl font-bold"
	class:placed
	class:misplaced={placed === false}
	class:wrong={done && placed === undefined}
	class:animate={done}
>
	{letter.toUpperCase()}
</div>

<style>
	.placed {
		@apply bg-green-800 text-white;
	}

	.misplaced {
		@apply bg-yellow-600 text-white;
	}

	.wrong {
		@apply bg-gray-500 text-white;
	}

	.animate {
		animation: animate-cell linear;
		animation-duration: 0.15s;
	}

	@keyframes animate-cell {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
		}

		100% {
			transform: scale(1);
		}
	}
</style>
