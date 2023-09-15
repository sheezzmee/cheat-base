import { cheatBase } from '../cheatBase.js';
import { toLong } from '../utils.js';

class BattleChat {
    sendMessage = (message, teamMessage = false) => cheatBase.dispatch(
        new SendMessage_0(message, teamMessage)
    )

    spectatorMessage = message => cheatBase.gameClasses.hud?.send(new BattleChatSpectatorHudMessage(
        message,
        new BattleTeam('', 2)
    ))

    systemMessage = message => cheatBase.gameClasses.hud?.send(new BattleChatSystemHudMessage(
        message
    ))

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