import regex from './regex.js';
import { regexFinder, prototypeHook } from '../../utils.js';
import { cheatBase } from '../..';
import Player from '../../GameClasses/Player.js';

export default () => {
	const onTankEntityCreated = regexFinder(
		TankSpawnerModel.prototype,
		regex.onTankEntityCreated
	);

	prototypeHook(
		TankSpawnerModel,
		onTankEntityCreated[0],
		(tank, isLocal, changeAppearance) => {
			!cheatBase.battleClasses.players &&
				(cheatBase.battleClasses.players = []);
				
			try {
				cheatBase.battleClasses.players.push(new Player(tank, isLocal));
			} catch (error) {
				console.error(error);
			}
		},
		false
	);
};
