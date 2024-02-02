import { cheatBase } from '..';
import { toLong } from '../utils.js';

class Battle {
	activateBattle = id => cheatBase.dispatch(new ActivateBattle(toLong(id)));

	activateBattleAtLink = link =>
		this.activateBattle(BigInt(`0x${link.split('=').at(-1)}`).toString());

	exitFromBattle = () => cheatBase.dispatch(new ExitFromBattle(false));

	fight = (id, battleTeam) => {
		if (id.includes('#/battle='))
			id = BigInt(`0x${id.split('=').at(-1)}`).toString();

		switch (battleTeam) {
			case 'TEAM_A':
				battleTeam = 0;
				break;
			case 'TEAM_B':
				battleTeam = 1;
				break;
			case 'NONE':
				battleTeam = 2;
				break;
		}

		cheatBase.dispatch(
			new Fight(toLong(id), new BattleTeam('', battleTeam))
		);
	};
}

export const battle = new Battle();
