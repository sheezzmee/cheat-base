import { cheatBase } from '../cheatBase.js';

class BattleChat {
    /**
     * @param {string} message 
     * @param {boolean} teamMessage 
     */
    sendMessage = (message, teamMessage = false) => cheatBase.dispatch(
        new SendMessage_0(message, teamMessage)
    )
}

export const battleChat = new BattleChat;