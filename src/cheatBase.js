import * as utils from './utils.js';
import * as features from './Features/features.js';
import hooks from './hooks.js';

class CheatBase extends Event {
	dispatchLog = false;
	ready = false;

	constructor() {
		super('cheat-base-ready');
	}

	init = () => {
		this.init = () => {};
		hooks();

		const __this__ = this;
		utils.prototypeHook(unsafeWindow.Store, 'i:0', function () {
			__this__.gameClasses.store = this;

			const dispatchFunction = utils.find(this, 'i:3')?.[0];

			!this.dispatchFunction &&
				(this.dispatchFunction = this[dispatchFunction]);

			this[dispatchFunction] = function (action) {
				const actionName = utils.getSimpleName(action);

				if (actionName === 'Init' && __this__.ready === false) {
					__this__.ready = true;
					__this__.dispatch(new PressedAnyButton(true));
					dispatchEvent(__this__);
				}

				const event = new Event(actionName);
				event.action = action;
				dispatchEvent(event);

				__this__.dispatchLog &&
					console.log(`store.dispatch(${actionName})`, action);

				return this.dispatchFunction(action);
			};
		});
	};

	dispatch = action => this.gameClasses.store?.dispatchFunction(action);
	utils = utils;
	features = features;
	gameClasses = {
		store: null,
		world: null,
		localPlayer: null,
		gameMode: null,
		inventoryModel: null,
		game: null,
		hud: null,
		players: null
	};
	runAfterPhysicsUpdate = [];
	forbiddenMessages = [];
	get version() {
		return '1.0.0';
	}
}

export const cheatBase = new CheatBase();
