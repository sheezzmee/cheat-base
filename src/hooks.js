import { cheatBase } from './cheatBase.js';
import { prototypeHook, find } from './utils.js';
import Player from './GameClasses/Player.js';

import validate from './validate.js';

const createProperty = name => ({
	get: function () {
		return this[name];
	},
	set: function (value) {
		this[name] = value;
	}
});

export default () => {
	/*{
		const UidNotifierModel = unsafeWindow.UidNotifierModel;

		delete unsafeWindow.UidNotifierModel;
		delete unsafeWindow.UidNotifierModelBase;
		delete unsafeWindow.UidNotifierModelServer;

		validate('228');
		prototypeHook(UidNotifierModel, 'i:1', users => {
			prototypeHook(UidNotifierModel, 'i:1', () => {});

			cheatBase.features.notifications.info(
				['CheatBase by', 'sheezzmee', `v${cheatBase.version}`],
				null,
				null,
				10000
			);

			const id = find(users, 'i:1.0.i:0')?.[1]?.toString?.();
			const uid = find(users, 'i:1.0.i:1')?.[1];
			validate(id, uid);
		});
	}*/

	{
		const sendFunction = find(unsafeWindow.BattleEntity.prototype, 'i:12')[1];
		const onFunction = find(unsafeWindow.BattleEntity.prototype, 'i:13')[1];

		prototypeHook(unsafeWindow.BattleEntity, 'i:12', function (message) {
			for (const forbiddenMessage of cheatBase.forbiddenMessages) {
				if (forbiddenMessage === message?.constructor) return 'skip';
			}
		});

		unsafeWindow.BattleEntity.prototype.send = function () {
			return sendFunction.apply(this, arguments);
		};

		unsafeWindow.BattleEntity.prototype.on = function (
			messageClass,
			priority,
			dispatchOnce,
			handler
		) {
			if (messageClass.$metadata$?.$kClass$) {
				messageClass = messageClass.$metadata$.$kClass$;
			} else {
				const kClass = new unsafeWindow.SimpleKClassImpl(messageClass);
				messageClass.$metadata$.$kClass$ = kClass;
				return this.on(messageClass, priority, dispatchOnce, handler);
			}

			return onFunction.call(
				this,
				messageClass,
				priority,
				dispatchOnce,
				handler
			);
		};

		const entity = new unsafeWindow.BattleEntity();
		Object.defineProperties(unsafeWindow.BattleEntity.prototype, {
			components_map: createProperty(find(entity, 'map')[0]),
			components: createProperty(find(entity, 'list')[0])
		});

		const map = new unsafeWindow.NativeIdentityMap();
		Object.defineProperties(unsafeWindow.NativeIdentityMap.prototype, {
			map: createProperty(find(map, 'i:0')[0])
		});

		const list = new unsafeWindow.NativeList();
		Object.defineProperties(unsafeWindow.NativeList.prototype, {
			array: createProperty(find(list, 'i:0')[0])
		});
	}

	{
		const init = find(unsafeWindow.BattleEntity.prototype, 'i:0')[1];
		unsafeWindow.Quaternion.prototype.send = function () {
			return init.apply(this, arguments);
		};
	}

	{
		let enabled;
		prototypeHook(unsafeWindow.Shop_2, 'i:1', function () {
			!enabled && (enabled = find(this, 'i:9')[0]);
			this[enabled] = true;
		});
	}

	{
		prototypeHook(unsafeWindow.World, 'i:1', function () {
			cheatBase.gameClasses.world = this;

			setTimeout(() => {
				if (!this.physicsTime) {
					Object.defineProperties(unsafeWindow.World.prototype, {
						physicsTime: createProperty(find(this, 'i:15')[0])
					});
				}
			}, 300);
		});

		prototypeHook(
			unsafeWindow.World,
			'i:37',
			() => {
				for (const key in cheatBase.gameClasses) {
					if (key !== 'store') cheatBase.gameClasses[key] = null;
				}
			},
			true
		);
	}

	{
		prototypeHook(
			unsafeWindow.GameMode,
			'i:3',
			function () {
				setTimeout(() => {
					cheatBase.gameClasses.gameMode = this;
					cheatBase.gameClasses.game = find(this, 'entity')[1];
					cheatBase.gameClasses.hud = find(this, 'entity:0')[1];
				}, 100);
			},
			true
		);
	}

	{
		let init = false;
		let entity;
		prototypeHook(
			unsafeWindow.LocalTankStateServerSenderComponent,
			'i:6',
			function () {
				if (init === false) {
					init = true;

					Object.defineProperties(
						unsafeWindow.LocalTankStateServerSenderComponent.prototype,
						{
							serverInterface: createProperty(find(this, 'i:13')[0]),
							speedCharacteristics: createProperty(find(this, 'i:16')[0])
						}
					);
				}
				!entity && (entity = find(this, 'entity')[0]);
				if (cheatBase.gameClasses.localPlayer?.entity !== this[entity]) return;

				for (const callback of cheatBase.runAfterPhysicsUpdate) {
					try {
						callback();
					} catch (error) {
						console.error(error);
					}
				}
			}
		);
	}

	{
		let supply;
		prototypeHook(
			unsafeWindow.InventoryModel,
			'i:3',
			function (supplyType, count, activateOnServerFunction) {
				!supply && (supply = find(supplyType, 'i:0')[0]);
				!this.items && (this.items = []);

				cheatBase.gameClasses.inventoryModel = this;
				this.items[supplyType[supply]] = activateOnServerFunction;
			}
		);
	}

	{
		const vector3 = new unsafeWindow.Vector3();
		Object.defineProperties(unsafeWindow.Vector3.prototype, {
			x: createProperty(find(vector3, 'i:0')[0]),
			y: createProperty(find(vector3, 'i:1')[0]),
			z: createProperty(find(vector3, 'i:2')[0])
		});
	}

	{
		const weaponTrigger = new unsafeWindow.WeaponTrigger();
		Object.defineProperties(unsafeWindow.WeaponTrigger.prototype, {
			pulled: createProperty(find(weaponTrigger, 'i:5')[0])
		});
	}

	{
		const speedCharacteristics =
			new unsafeWindow.SpeedCharacteristicsComponent();
		Object.defineProperties(
			unsafeWindow.SpeedCharacteristicsComponent.prototype,
			{
				specificationId: createProperty(find(speedCharacteristics, 'i:3')[0])
			}
		);
	}

	{
		const bodyState = new unsafeWindow.BodyState();
		Object.defineProperties(unsafeWindow.BodyState.prototype, {
			velocity: createProperty(find(bodyState, 'i:0')[0]),
			orientation: createProperty(find(bodyState, 'i:1')[0]),
			angularVelocity: createProperty(find(bodyState, 'i:2')[0]),
			position: createProperty(find(bodyState, 'i:3')[0])
		});

		const extractSubstring = (str, startPattern, endPattern) => {
			const from = str.indexOf(startPattern);
			if (from === -1) return null;

			const to = str.indexOf(endPattern, from);
			if (to === -1) return null;

			return str.substring(from + startPattern.length, to);
		};

		const explode = str => {
			const result = [];
			let remainingStr = str;

			while (true) {
				const currentSubstring = extractSubstring(remainingStr, 'this.', '()+');
				if (!currentSubstring) break;

				result.push(currentSubstring);
				remainingStr = remainingStr.substring(remainingStr.indexOf('()+') + 3);
			}

			return result;
		};

		const get = str => {
			return extractSubstring(str, 'this.', ';');
		};

		const result = explode(
			unsafeWindow.TankState.prototype.toString.toString()
		);

		unsafeWindow.TankState.prototype[result[0]];

		Object.defineProperties(unsafeWindow.TankState.prototype, {
			angularVelocity: createProperty(
				get(unsafeWindow.TankState.prototype[result[0]].toString())
			),
			linearVelocity: createProperty(
				get(unsafeWindow.TankState.prototype[result[1]].toString())
			),
			orientation: createProperty(
				get(unsafeWindow.TankState.prototype[result[2]].toString())
			),
			position: createProperty(
				get(unsafeWindow.TankState.prototype[result[3]].toString())
			)
		});
	}

	{
		const tankState = new unsafeWindow.GetTankState();
		Object.defineProperties(unsafeWindow.GetTankState.prototype, {
			state: createProperty(find(tankState, 'i:0')[0])
		});

		const clientTankState = new unsafeWindow.ClientTankState();
		Object.defineProperties(unsafeWindow.ClientTankState.prototype, {
			name: createProperty(find(clientTankState, 'i:0')[0])
		});
	}

	{
		const battleChat = new unsafeWindow.BattleChatHudComponent();
		Object.defineProperties(unsafeWindow.BattleChatHudComponent.prototype, {
			isInputActive: createProperty(find(battleChat, 'i:5')[0])
		});
	}

	{
		const body = new unsafeWindow.Body();
		Object.defineProperties(unsafeWindow.Body.prototype, {
			movable: createProperty(find(body, 'i:5')[0])
		});
	}

	{
		const user = new unsafeWindow.User();
		Object.defineProperties(unsafeWindow.User.prototype, {
			id: createProperty(find(user, 'i:0')[0]),
			crystals: createProperty(find(user, 'i:2')[0]),
			coins: createProperty(find(user, 'i:3')[0]),
			rank: createProperty(find(user, 'i:6')[0]),
			score: createProperty(find(user, 'i:8')[0]),
			gearScore: createProperty(find(user, 'i:9')[0]),
			weaponGS: createProperty(find(user, 'i:10')[0]),
			hullGS: createProperty(find(user, 'i:11')[0]),
			droneGS: createProperty(find(user, 'i:12')[0]),
			resistanceGS: createProperty(find(user, 'i:13')[0]),
			uid: createProperty(find(user, 'i:15')[0]),
			clanTag: createProperty(find(user, 'i:16')[0]),
			hasPremium: createProperty(find(user, 'i:19')[0])
		});
	}

	{
		prototypeHook(
			unsafeWindow.TankSpawnerModel,
			'i:2',
			(tank, isLocal, changeAppearance) => {
				!cheatBase.gameClasses.players && (cheatBase.gameClasses.players = []);
				cheatBase.gameClasses.players.push(new Player(tank, isLocal));
			},
			false
		);
	}
};
