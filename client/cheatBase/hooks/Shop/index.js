import regex from './regex.js';
import { find, regexFinder, prototypeHook } from '../../utils.js';

export default () => {
	const initFunction = regexFinder(Shop_2.prototype, regex.init);

	let enabled;
	prototypeHook(Shop_2, initFunction[0], function () {
		if (!enabled) {
			enabled = find(this, 'i:9')[0];
		}

		this[enabled] = true;
	});
};
