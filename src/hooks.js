import { cheatBase } from './cheatBase.js';
import { toLong, prototypeHook, find } from './utils.js';

export default () => {
    {
        const sendFunction = find(BattleEntity.prototype, 'i:12')[1];
        BattleEntity.prototype.send = function() {
            return sendFunction.apply(this, arguments);
        }
    }

    {
        let enabled = null;
        prototypeHook(Shop_2, 'i:1', function() {
            !enabled && (enabled = find(this, 'i:9')[0]);
            this[enabled] = true;
        })
    }

    {
        prototypeHook(World, 'i:1', function() {
            cheatBase.gameClasses.world = this;
        })

        prototypeHook(World, 'i:35', () => {
            for (const key in cheatBase.gameClasses) {
                cheatBase.gameClasses[key] = null;
            }
        }, true)
    }

    {
        prototypeHook(GameMode, 'i:2', function() {
            cheatBase.gameClasses.gameMode = this;
        })
    }

    {
        let entity;
        prototypeHook(LocalTankStateServerSenderComponent, 'i:6', function() {
            !entity && (entity = find(this, 'entity')[0]);
            cheatBase.gameClasses.localPlayer = this[entity];
            for (const callback of cheatBase.runAfterPhysicsUpdate) {
                try {
                    callback();
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }
}