import { init, register, getLocaleFromNavigator, addMessages } from 'svelte-i18n';
import en from './en';

// English loaded by default synchronously
addMessages('en', en);

// Other languages are async
register('fr', () => import('./fr'));

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
