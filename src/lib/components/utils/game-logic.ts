import type { AlertData } from '$lib/store';

export const ROWS_COUNT = 6;

export type ExtendedAlertData = AlertData & {
	parameters?: Record<string, string | number | boolean | Date>;
};

export type EventResult = {
	entries: string[];
	alert?: ExtendedAlertData;
};

export function hasWon(entries: string[], answer: string): boolean {
	return entries.some((entry, i) => entry === answer && i !== entries.length - 1);
}

export function processKey(
	validWords: string[],
	entries: string[],
	answer: string,
	key: string
): EventResult {
	const current = entries[entries.length - 1];

	if (entries.length > ROWS_COUNT) {
		return {
			entries,
			alert: {
				level: 'warn',
				message: `alerts.lost-already`,
				parameters: { answer }
			}
		};
	}

	if (hasWon(entries, answer)) {
		return {
			entries,
			alert: {
				level: 'info',
				message: `alerts.won-already`
			}
		};
	}

	if (key === 'Backspace') {
		if (current.length > 0) {
			const updated = current.slice(0, -1);
			const updatedEntries = [...entries.slice(0, -1), updated];
			return { entries: updatedEntries };
		}
	}
	if (key === 'Enter') {
		if (current.length === 5) {
			const isValid = validWords.indexOf(current.toLowerCase()) > -1;
			const hasWon = current === answer;
			if (hasWon) {
				const updatedEntries = [...entries, ''];
				return {
					entries: updatedEntries,
					alert: { message: 'alerts.won', level: 'success' }
				};
			} else if (isValid) {
				const updatedEntries = [...entries, ''];
				if (entries.length === ROWS_COUNT) {
					return {
						entries: updatedEntries,
						alert: {
							message: 'alerts.lost',
							parameters: { answer },
							level: 'error'
						}
					};
				}
				return { entries: updatedEntries };
			} else {
				return { entries, alert: { message: 'alerts.not-a-word', level: 'error' } };
			}
		}
	}
	if (key.length === 1 && key.match(/[a-zA-Z]/)) {
		if (current.length < 5) {
			const updated = current + key;
			const updatedEntries = [...entries.slice(0, -1), updated];
			return { entries: updatedEntries };
		}
	}
	return { entries };
}
