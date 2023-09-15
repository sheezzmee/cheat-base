import { cheatBase } from './cheatBase.js';
import { toLong, prototypeHook, find } from './utils.js';
import Player from './GameClasses/Player.js';

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

        prototypeHook(World, 'i:37', () => {
            for (const key in cheatBase.gameClasses) {
                cheatBase.gameClasses[key] = null;
            }
        }, true)
    }

    {
        prototypeHook(GameMode, 'i:3', function() {
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
            cheatBase.gameClasses.localPlayer = new Player(this[entity]);
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

    const createProperty = name => ({
        get: function() {
            return this[name];
        },
        set: function(value) {
            this[name] = value;
        }
    });

    {
        const vector3 = new Vector3;
        Object.defineProperties(Vector3.prototype, {
            x: createProperty(find(vector3, 'i:0')[0]),
            y: createProperty(find(vector3, 'i:1')[0]),
            z: createProperty(find(vector3, 'i:2')[0])
        })
    }

    {
        const bodyState = new BodyState;
        Object.defineProperties(BodyState.prototype, {
            velocity: createProperty(find(bodyState, 'i:0')[0]),
            orientation: createProperty(find(bodyState, 'i:1')[0]),
            angularVelocity: createProperty(find(bodyState, 'i:2')[0]),
            position: createProperty(find(bodyState, 'i:3')[0]),
        })
    }

    {
        const nativeList = new NativeList;
        Object.defineProperties(NativeList.prototype, {
            array: createProperty(find(nativeList, 'i:0')[0])
        })
    }

    {
        const tankState = new GetTankState;
        Object.defineProperties(GetTankState.prototype, {
            state: createProperty(find(tankState, 'i:0')[0])
        })

        const clientTankState = new ClientTankState;
        Object.defineProperties(ClientTankState.prototype, {
            name: createProperty(find(clientTankState, 'i:0')[0])
        })
    }

    {
        prototypeHook(TanksOnFieldRegistryImpl, 'i:0', (id, entity) => {
            !cheatBase.gameClasses.players && (cheatBase.gameClasses.players = []);
            cheatBase.gameClasses.players.push(new Player(entity));
        }, true)

        prototypeHook(TanksOnFieldRegistryImpl, 'i:1', id => {
            !cheatBase.gameClasses.players && (cheatBase.gameClasses.players = []);

            const long = id.toString();

            cheatBase.gameClasses.players = 
                cheatBase.gameClasses.players.filter(player => player.id !== long);
        }, true)
    }
}