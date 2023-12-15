import { cheatBase } from '../cheatBase.js';
import { find } from '../utils.js';

let destroy;
export default class Player extends Event {
	entity = null;
	local = false;
	body = null;
	state = null;
	map = null;
	id = new GetPlayerId();
	team = new GetTeamQuery();

	name = null;

	constructor(entity, isLocal) {
		super('onPlayerCreated');
		this.entity = entity;

		entity.send(this.id);
		entity.send(this.team);

		this.id = find(this.id, 'long')[1].toString();
		this.team = find(this.team, 'team.i:0')[1];
		this.map = entity.components_map.map;
		this.body = find(this.get(TankPhysicsComponent), 'body')[1];
		this.state = find(this.body, 'state')[1];

		if (isLocal) {
			this.local = true;
			cheatBase.gameClasses.localPlayer = this;
		}

		if (!destroy) destroy = find(this.entity, '__proto__.i:11')[0];

		const __this__ = this;
		this.entity.destroy_copy = this.entity[destroy];
		this.entity[destroy] = function () {
			if (__this__.local) cheatBase.gameClasses.localPlayer = null;

			cheatBase.gameClasses.players = cheatBase.gameClasses.players.filter(
				player => player.id !== __this__.id
			);

			return this.destroy_copy.apply(this, arguments);
		};

		this.on(ConfigureUserTitleMessage, message => {
			const userName = find(message, 'title.i:0')[1],
				clanTag = find(message, 'title.i:1')[1];

			this.name = `${clanTag ? `[${clanTag}] ` : ''}${userName}`;
		});

		dispatchEvent(this);
	}

	get isEnemy() {
		if (this.team === 'NONE' && this.local === false) return true;

		return cheatBase.gameClasses.localPlayer.team !== this.team;
	}

	get tankState() {
		const tankState = new GetTankState();
		this.send(tankState);
		return tankState.state.name;
	}

	sendState = state => {
		if (!this.local)
			throw new Error('пытаешься отправить танкстейт не локального игрока');

		if (!this.serverSender)
			this.serverSender = this.get(LocalTankStateServerSenderComponent);

		const sendState = cheatBase.utils.find(TankModel.prototype, 'i:17')[0];
		this.serverSender.serverInterface[sendState](
			cheatBase.gameClasses.world.physicsTime,
			this.serverSender.speedCharacteristics.specificationId,
			state
		);
	};

	send = message => this.entity?.send(message);
	on = (messageClass, handler, priority = 0, dispatchOnce = false) =>
		this.entity?.on(messageClass, priority, dispatchOnce, handler);
	get = kClass => {
		const array = this.map?.get(kClass.$metadata$.$kClass$)?.array;

		if (array?.length === 1) return array[0];

		return array;
	};
}
