import { cheatBase } from '../cheatBase.js';
import { toLong } from '../utils.js';

class Battle {
    /**
     * @param {string} id 
     */
    activateBattle = id => cheatBase.dispatch(new ActivateBattle(toLong(id)));

    /**
     * ```js
     * activateBattleAtLink('#/battle=2aaaaaaaaaaafab1')
     * ```
     * @param {string} link 
     */
    activateBattleAtLink = link => this.activateBattle(
        BigInt(`0x${link.split('=').at(-1)}`).toString()
    )

    exitFromBattle = () => cheatBase.dispatch(new ExitFromBattle(false))

    /**
     * ```js
     * import battleTeamEnum from 'battleTeamEnum.js'
     * 
     * fight('#/battle=2aaaaaaaaaaafab1', battleTeamEnum.TEAM_A)
     * fight('3074457345618279089', battleTeamEnum.TEAM_B)
     * ```
     * @param {string} id 
     * @param {number} battleTeam 
     */
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