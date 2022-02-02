import type { Translations } from './types';

const translations: Translations = {
	alerts: {
		'lost-already':
			'Vous avez déjà perdu. Rafraichissez la page pour commencer une nouvelle partie. La réponse était {answer}.',
		lost: 'Vous avez perdu ! La réponse était {answer}. Rafraichissez la page pour rejouer.',
		won: 'Bravo, vous avez gagné !',
		'not-a-word': "Ce n'est pas un mot valide !",
		'won-already': 'Vous avez déjà gagné ! Essayez de rafraichir la page pour rejouer une partie.'
	},
	home: {
		title: 'Fivlet'
	},
	keyboard: {
		first: 'a z e r t y u i o p',
		second: 'q s d f g h j k l m',
		third: 'Enter w x c v b n Backspace'
	}
};

export default translations;
