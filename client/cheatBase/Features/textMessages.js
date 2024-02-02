import { cheatBase } from '..';

class TextMessages {
	white = (text, lifeTimeMs = 1000) =>
		cheatBase.dispatch(
			new AddTextMessage(
				new BattleMessageType('', 6),
				text,
				new Long(lifeTimeMs, 0)
			)
		);

	orange = (text, lifeTimeMs = 1000) =>
		cheatBase.dispatch(
			new AddTextMessage(
				new BattleMessageType('', 2),
				text,
				new Long(lifeTimeMs, 0)
			)
		);

	red = (text, lifeTimeMs = 1000) =>
		cheatBase.dispatch(
			new AddTextMessage(
				new BattleMessageType('', 0),
				text,
				new Long(lifeTimeMs, 0)
			)
		);

	blue = (text, lifeTimeMs = 1000) =>
		cheatBase.dispatch(
			new AddTextMessage(
				new BattleMessageType('', 5),
				text,
				new Long(lifeTimeMs, 0)
			)
		);
}

export const textMessages = new TextMessages();
