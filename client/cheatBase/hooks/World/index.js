import regex from './regex.js';
import { find, regexFinder, prototypeHook } from '../../utils.js';
import { createProperty } from '../index.js';
import { cheatBase } from '../..';

export default () => {
	const initFunction = regexFinder(World.prototype, regex.init);
	const closeFunction = regexFinder(World.prototype, regex.close);

	prototypeHook(World, initFunction[0], function () {
		cheatBase.battleClasses.world = this;

		if (typeof this.physicsTime !== 'number') {
			Object.defineProperties(World.prototype, {
				physicsTime: createProperty(find(this, 'i:15')[0])
			});
		}
	});

	prototypeHook(
		World,
		closeFunction[0],
		() => {
			for (const key in cheatBase.battleClasses) {
				cheatBase.battleClasses[key] = null;
			}
		},
		true
	);
};
