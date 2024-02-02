import { cheatBase } from '..';
import { toLong } from '../utils.js';

class BattleChat {
	isInputActive = () =>
		!!cheatBase.battleClasses.hud?.components_map.map.get(
			BattleChatHudComponent.$metadata$.$kClass$
		)?.array[0].isInputActive;

	sendMessage = (message, teamMessage = false) =>
		cheatBase.dispatch(new SendMessage_0(message, teamMessage));

	spectatorMessage = message =>
		cheatBase.battleClasses.hud?.send(
			new BattleChatSpectatorHudMessage(message, new BattleTeam('', 2))
		);

	systemMessage = message =>
		cheatBase.battleClasses.hud?.send(new BattleChatSystemHudMessage(message));

	developerMessage = message =>
		cheatBase.battleClasses.hud?.send(
			new BattleChatUserHudMessage(
				new UserLabelData(
					toLong(0),
					'sheezzmee',
					31,
					true,
					null,
					new TeamRelation('', 0)
				),
				message
			)
		);
}

export const battleChat = new BattleChat();
