import { cheatBase } from '../cheatBase.js';
import { toLong } from '../utils.js';

class Battle {
    activateBattle = id => cheatBase.dispatch(new ActivateBattle(toLong(id)));

    activateBattleAtLink = link => this.activateBattle(
        BigInt(`0x${link.split('=').at(-1)}`).toString()
    )

    exitFromBattle = () => cheatBase.dispatch(new ExitFromBattle(false))

    fight = (id, battleTeam) => {
        if (id.includes('#/battle='))
            id = BigInt(`0x${id.split('=').at(-1)}`).toString()

        cheatBase.dispatch(new Fight(
            toLong(id),
            new BattleTeam('', battleTeam)
        ))
    }
}

export const battle = new Battle;