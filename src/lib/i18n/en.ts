import type { Translations } from './types';

const translations: Translations = {
	alerts: {
		'lost-already':
			'You lost already. Refresh the page to start another game. The answer was {answer}.',
		lost: 'You lost ! The answer was {answer}. Refresh the page to play again.',
		won: 'Well done, you won!',
		'not-a-word': 'This is not a word!',
		'won-already': 'You have won already. Try refreshing the page to play again.'
	},
	home: {
		title: 'Fivlet'
	},
	keyboard: {
		first: 'q w e r t y u i o p',
		second: 'a s d f g h j k l',
		third: 'Enter z x c v b n m Backspace'
	}
};

export default translations;
