import { cheatBase } from './cheatBase.js';
import { toLong, prototypeHook, find } from './utils.js';

export default () => {
    {
        const sendFunction = find(BattleEntity.prototype, 'i:12')[1];
        const onFunction = find(BattleEntity.prototype, 'i:13')[1];

        BattleEntity.prototype.send = function() {
            return sendFunction.apply(this, arguments);
        }

        BattleEntity.prototype.on = function(messageClass, priority, dispatchOnce, handler) {
            if (messageClass.$metadata$?.$kClass$) {
                messageClass = messageClass.$metadata$.$kClass$;
            }
            else {
                const kClass = new SimpleKClassImpl(messageClass);
                messageClass.$metadata$.$kClass$ = kClass;
                return this.on(messageClass, priority, dispatchOnce, handler)
            }

            return onFunction.call(this, messageClass, priority, dispatchOnce, handler);
        }
    }

    {
        let enabled;
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
            setTimeout(() => {
                cheatBase.gameClasses.gameMode = this;
                cheatBase.gameClasses.game = find(this, 'entity')[1];
                cheatBase.gameClasses.hud = find(this, 'entity:0')[1];
            }, 100);
        }, true)
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

    {
        let supply;
        prototypeHook(InventoryModel, 'i:3', function(supplyType, count, activateOnServerFunction) {
            !supply && (supply = find(supplyType, 'i:0')[0]);
            !this.items && (this.items = []);

            cheatBase.gameClasses.inventoryModel = this;
            this.items[supplyType[supply]] = activateOnServerFunction;
        })
    }
}