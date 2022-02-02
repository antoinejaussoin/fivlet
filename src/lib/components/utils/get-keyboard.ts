import type { KeyboardKey, LetterStatus } from '../types';

export default function getKeyboard(
	entries: string[],
	answer: string,
	keyboard: string[]
): KeyboardKey[][] {
	// const keyboard: string[] = [
	// 	'a z e r t y u i o p',
	// 	'q s d f g h j k l m',
	// 	'Enter w x c v b n Backspace'
	// ];

	const keys: KeyboardKey[][] = keyboard.map((row) =>
		row.split(' ').map((l) => ({ key: l, icon: getIcon(l), status: getStatus(entries, answer, l) }))
	);

	return keys;
}

function getStatus(entries: string[], answer: string, letter: string): LetterStatus {
	if (letter.length > 1) {
		return 'none';
	}

	const validatedEntries = entries.slice(0, -1);

	const played = validatedEntries.join().includes(letter);
	const misplaced = played && answer.includes(letter);
	const letterIndex = answer.indexOf(letter);
	const placed =
		letterIndex === -1
			? false
			: validatedEntries
					.map((e) => e[letterIndex])
					.join()
					.includes(letter);

	if (placed) {
		return 'placed';
	}
	if (misplaced) {
		return 'misplaced';
	}
	if (played) {
		return 'not-there';
	}
	return 'none';
}

function getIcon(key: string): string | undefined {
	switch (key) {
		case 'Enter':
			return '↩';
		case 'Backspace':
			return '⌫';
		default:
			return undefined;
	}
}
