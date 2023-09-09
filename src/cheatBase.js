import * as utils from './utils.js';
import * as features from './Features/features.js';
import hooks from './hooks.js';

class CheatBase {
    store = null;
    dispatchLog = false;
    ready = false;

    constructor() {
        addEventListener('cheat-base-initialized', () => {
            hooks();

            const __this__ = this;
            utils.prototypeHook(Store, 'i:0', function() {
                __this__.store = this;
    
                const dispatchFunction = utils.find(this, 'i:3')?.[0];
    
                !this.dispatchFunction && (this.dispatchFunction = this[dispatchFunction]);
        
                this[dispatchFunction] = function (action) {
                    const actionName = utils.getSimpleName(action);
                    
                    if (actionName === 'Init' && __this__.ready === false) {
                        __this__.ready = true;
                        dispatchEvent(
                            new CustomEvent('cheat-base-ready', {
                                bubbles: true,
                                detail: __this__
                            })
                        )
                    }

                    dispatchEvent(
                        new CustomEvent(actionName, {
                            bubbles: true,
                            detail: action
                        })
                    )

                    __this__.dispatchLog && console.debug(`store.dispatch(${actionName})`, action);
                    return this.dispatchFunction(action);
                }
            })
        })

        addEventListener('cheat-base-ready', event => {
            unsafeWindow.toxic = event.detail;
            this.dispatch(new PressedAnyButton(true));
        })
    }

    dispatch = action => this.store?.dispatchFunction(action);
    utils = utils;
    features = features;
    gameClasses = {
        world: null,
        localPlayer: null,
        gameMode: null
    };
    runAfterPhysicsUpdate = [];
}

export const cheatBase = new CheatBase;