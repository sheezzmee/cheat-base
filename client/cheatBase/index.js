import * as utils from './utils.js';
import * as features from './Features/features.js';
import hooks from './hooks/index.js';
import config, { saveConfig } from '../config.js';

class CheatBase extends Event {
	_dispatchLog = config.dispatchLog;
	ready = false;

	constructor() {
		super('cheat-base-ready');
	}

	init = function () {
		this.init = () => {};
		hooks();

		const __this__ = this;
		utils.prototypeHook(Store, 'i:0', function () {
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
					window.cheatBase = __this__;
				}

				if (actionName === 'PauseActivated') {
					return this.dispatchFunction(new DeactivatePause());
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
	battleClasses = {
		world: null,
		localPlayer: null,
		gameMode: null,
		supplies: null,
		game: null,
		hud: null,
		players: null
	};
	gameClasses = {
		store: null
	};
	runAfterPhysicsUpdate = [];

	get dispatchLog() {
		return this._dispatchLog;
	}

	set dispatchLog(value) {
		this._dispatchLog = value;
		config.dispatchLog = value;
		saveConfig();
	}

	get version() {
		return '1.1.0';
	}
}

export const cheatBase = new CheatBase();
