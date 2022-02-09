import fs from 'fs/promises';
import { uniq } from 'lodash';
import path from 'path';

type Filter = (word: string) => boolean;

async function load() {
	const frAnswers = await processFile('reduced-fr.txt', 'answers-fr.ts', [], ignoreProperNoun);
	await processFile('full-fr.txt', 'valid-fr.ts', frAnswers);

	const enAnswers = await processFile('reduced-en.txt', 'answers-en.ts');
	await processFile('full-en.txt', 'valid-en.ts', enAnswers);
}

async function processFile(
	input: string,
	output: string,
	extra: string[] = [],
	filter?: Filter
): Promise<string[]> {
	const data = await loadFile(input, filter || noIgnore);
	const all = uniq([...data, ...extra]);
	console.log(
		output,
		'will have',
		all.length,
		'words',
		extra ? `(from original list of ${data.length})` : ''
	);
	await outputFile(all, output);
	return all;
}

async function loadFile(name: string, filter: Filter): Promise<string[]> {
	const wordFile = path.resolve(__dirname, 'lists', name);
	const data = await fs.readFile(wordFile);
	const buffer = Buffer.from(data);
	return buffer
		.toString()
		.split('\n')
		.filter(filter)
		.map((w) => w.toLocaleLowerCase()) // Lower case
		.map((w) => w.normalize('NFD').replace(/\p{Diacritic}/gu, '')) // Remove accents
		.filter((w) => w.length === 5); // Keep 5-letter words
}

async function outputFile(words: string[], name: string): Promise<void> {
	const outputFile = path.resolve(__dirname, '..', 'src', 'lib', 'words', name);
	const output =
		'const words = [\n' + words.map((w) => `\t'${w}',`).join('\n') + '\n];\nexport default words;';
	await fs.writeFile(outputFile, output);
}

function noIgnore(): boolean {
	return true;
}

function ignoreProperNoun(word: string): boolean {
	return !/[A-Z]/.test(word.charAt(0));
}

load();
