import { writable } from 'svelte/store';

export type AlertData = {
	message: string;
	level: 'error' | 'warn' | 'info' | 'success';
};

export const message = writable<AlertData | undefined>(undefined);
