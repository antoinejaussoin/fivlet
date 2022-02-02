export type KeyboardKey = {
	key: string;
	icon?: string;
	status: LetterStatus;
};

export type LetterStatus = 'none' | 'misplaced' | 'placed' | 'not-there';
