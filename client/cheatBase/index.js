import * as utils from '../shared/utils';
import hooks from './hooks';
import * as features from './features';
import config, { saveConfig } from '../shared/config';

let dispatchFunction;
class CheatBase extends Event {
    _dispatchLog = config.dispatchLog;
    ready = false;
    utils = utils;
    features = features;
    battleClasses = {};
    gameClasses = {};
    users = {};
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

    constructor() {
        super('cheat-base-ready');
    }

    dispatch = action => {
        return this.gameClasses.store?.dispatchFunction(action);
    };

    init = function () {
        this.init = () => {};
        hooks();

        const __this__ = this;
        utils.prototypeHook(Store, 'i:0', function () {
            __this__.gameClasses.store = this;

            if (!dispatchFunction) {
                dispatchFunction = this.dispatchFunction;
            }

            this.dispatchFunction = function (action) {
                const actionName = utils.getSimpleName(action);

                if (actionName === 'Init' && __this__.ready === false) {
                    __this__.ready = true;
                    __this__.dispatch(new PressedAnyButton(true));
                    dispatchEvent(__this__);
                    window.cheatBase = __this__;
                }

                //if (actionName === 'PauseActivated') {
                //    return dispatchFunction.call(this, new DeactivatePause());
                //}

                const event = new Event(actionName);
                event.action = action;
                dispatchEvent(event);

                __this__.dispatchLog &&
                    console.log(`store.dispatch(${actionName})`, action);

                return dispatchFunction.call(this, action);
            };
        });
    };
}

export const cheatBase = new CheatBase();
