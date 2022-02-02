export async function getValidWords(locale = 'en') {
	const baseLocale = locale.slice(0, 2);
	const words: string[] = (await import(`./valid-${baseLocale}.ts`)).default;
	return words;
}

export async function getAnswers(locale = 'en') {
	const baseLocale = locale.slice(0, 2);
	const words: string[] = (await import(`./answers-${baseLocale}.ts`)).default;
	return words;
}
