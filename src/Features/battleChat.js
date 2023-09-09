import { cheatBase } from '../cheatBase.js';
import { toLong } from '../utils.js';

class BattleChat {
    /**
     * @param {string} message 
     * @param {boolean} teamMessage 
     */
    sendMessage = (message, teamMessage = false) => cheatBase.dispatch(
        new SendMessage_0(message, teamMessage)
    )

    /**
     * @param {string} message 
     */
    spectatorMessage = message => cheatBase.gameClasses.hud?.send(new BattleChatSpectatorHudMessage(
        message,
        new BattleTeam('', 2)
    ))

    /**
     * @param {string} message 
     */
    systemMessage = message => cheatBase.gameClasses.hud?.send(new BattleChatSystemHudMessage(
        message
    ))

    /**
     * @param {string} message 
     */
    developerMessage = message => cheatBase.gameClasses.hud?.send(new BattleChatUserHudMessage(
        new UserLabelData(
            toLong(0),
            'sheezzmee',
            31,
            true,
            null,
            new TeamRelation('', 0)
        ),
        message
    ))
}

export const battleChat = new BattleChat;