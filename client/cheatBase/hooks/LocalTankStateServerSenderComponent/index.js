import regex from './regex.js';
import { find, regexFinder, prototypeHook } from '../../utils.js';
import { cheatBase } from '../..';
import { createProperty } from '../index.js';

export default () => {
	const runAfterPhysicsUpdate = regexFinder(
		LocalTankStateServerSenderComponent.prototype,
		regex.runAfterPhysicsUpdate
	);

	let init = false;
	prototypeHook(
		LocalTankStateServerSenderComponent,
		runAfterPhysicsUpdate[0],
		function () {
			if (init === false) {
				init = true;

				Object.defineProperties(LocalTankStateServerSenderComponent.prototype, {
					serverInterface: createProperty(find(this, 'i:13')[0]),
					speedCharacteristics: createProperty(find(this, 'i:16')[0])
				});
			}

			for (const callback of cheatBase.runAfterPhysicsUpdate) {
				try {
					callback();
				} catch (error) {
					console.error(error);
				}
			}
		}
	);
};
