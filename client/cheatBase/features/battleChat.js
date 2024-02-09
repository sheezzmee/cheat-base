import { cheatBase } from '..';
import { toLong, getNamedClasses } from '../../shared/utils';

class BattleChat {
    isInputActive = () => {
        if (!cheatBase.battleClasses.battleChatComponent) {
            const hud = getNamedClasses(
                cheatBase.battleClasses.hud?.components.array
            );

            if (!hud) {
                return false;
            }

            cheatBase.battleClasses.battleChatComponent =
                hud['BattleChatHudComponent'];
        } else {
            return cheatBase.battleClasses.battleChatComponent.isInputActive;
        }
    };

    sendMessage = (message, teamMessage = false) => {
        return cheatBase.dispatch(new SendMessage_0(message, teamMessage));
    };
}

export const battleChat = new BattleChat();
