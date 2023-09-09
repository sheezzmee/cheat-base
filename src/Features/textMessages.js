import { cheatBase } from '../cheatBase.js';

class TextMessages {
    /**
     * @param {string} text 
     * @param {number} lifeTimeMs 
     */
    white = (text, lifeTimeMs = 1000) => cheatBase.dispatch(new AddTextMessage(
        new BattleMessageType('', 6), 
        text,
        new Long(lifeTimeMs, 0)
    ))

    /**
     * @param {string} text 
     * @param {number} lifeTimeMs 
     */
    orange = (text, lifeTimeMs = 1000) => cheatBase.dispatch(new AddTextMessage(
        new BattleMessageType('', 2), 
        text,
        new Long(lifeTimeMs, 0)
    ))

    /**
     * @param {string} text 
     * @param {number} lifeTimeMs 
     */
    red = (text, lifeTimeMs = 1000) => cheatBase.dispatch(new AddTextMessage(
        new BattleMessageType('', 0), 
        text,
        new Long(lifeTimeMs, 0)
    ))

    /**
     * @param {string} text 
     * @param {number} lifeTimeMs 
     */
    blue = (text, lifeTimeMs = 1000) => cheatBase.dispatch(new AddTextMessage(
        new BattleMessageType('', 5), 
        text,
        new Long(lifeTimeMs, 0)
    ))
}

export const textMessages = new TextMessages;