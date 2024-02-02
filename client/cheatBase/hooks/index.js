import { find } from '../utils.js';

import battleEntityHooks from './BattleEntity/index.js';
import shopHooks from './Shop/index.js';
import worldHooks from './World/index.js';
import gameModeHooks from './GameMode/index.js';
import localTankStateServerSenderComponentHooks from './LocalTankStateServerSenderComponent/index.js';
import inventoryModelHooks from './InventoryModel/index.js';
import tankSpawnerModelHooks from './TankSpawnerModel/index.js';

export const createProperty = name => ({
	get: function () {
		return this[name];
	},
	set: function (value) {
		this[name] = value;
	}
});

export default () => {
	try {
		battleEntityHooks();
		shopHooks();
		worldHooks();
		gameModeHooks();
		localTankStateServerSenderComponentHooks();
		inventoryModelHooks();
		tankSpawnerModelHooks();
	} catch (error) {
		console.error(error);
	}

	{
		const vector3 = new Vector3();
		Object.defineProperties(Vector3.prototype, {
			x: createProperty(find(vector3, 'i:0')[0]),
			y: createProperty(find(vector3, 'i:1')[0]),
			z: createProperty(find(vector3, 'i:2')[0])
		});

		Vector3.prototype.init = function (x, y, z) {
			if (typeof x === 'object') {
				this.x = x.x;
				this.y = x.y;
				this.z = x.z;
				return;
			}
			this.x = x || 0;
			this.y = y || 0;
			this.z = z || 0;
		};
	}

	{
		const weaponTrigger = new WeaponTrigger();
		Object.defineProperties(WeaponTrigger.prototype, {
			pulled: createProperty(find(weaponTrigger, 'i:5')[0])
		});
	}

	{
		const speedCharacteristics = new SpeedCharacteristicsComponent();
		Object.defineProperties(SpeedCharacteristicsComponent.prototype, {
			specificationId: createProperty(find(speedCharacteristics, 'i:3')[0])
		});
	}

	{
		const bodyState = new BodyState();
		Object.defineProperties(BodyState.prototype, {
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

		const result = explode(TankState.prototype.toString.toString());

		Object.defineProperties(TankState.prototype, {
			angularVelocity: createProperty(
				get(TankState.prototype[result[0]].toString())
			),
			linearVelocity: createProperty(
				get(TankState.prototype[result[1]].toString())
			),
			orientation: createProperty(
				get(TankState.prototype[result[2]].toString())
			),
			position: createProperty(get(TankState.prototype[result[3]].toString()))
		});

		TankState.prototype.init = function () {
			this.angularVelocity = new Vector3();
			this.linearVelocity = new Vector3();
			this.orientation = new Vector3();
			this.position = new Vector3();
		};
	}

	{
		const tankState = new GetTankState();
		Object.defineProperties(GetTankState.prototype, {
			state: createProperty(find(tankState, 'i:0')[0])
		});

		const clientTankState = new ClientTankState();
		Object.defineProperties(ClientTankState.prototype, {
			name: createProperty(find(clientTankState, 'i:0')[0])
		});
	}

	{
		const battleChat = new BattleChatHudComponent();
		Object.defineProperties(BattleChatHudComponent.prototype, {
			isInputActive: createProperty(find(battleChat, 'i:5')[0])
		});
	}

	{
		const body = new Body();
		Object.defineProperties(Body.prototype, {
			movable: createProperty(find(body, 'i:5')[0])
		});
	}

	{
		for (const key in AlternativaLogger.prototype) {
			AlternativaLogger.prototype[key] = () => {};
		}
	}
};
