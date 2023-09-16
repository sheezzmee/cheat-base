import { cheatBase } from './cheatBase.js';
import { toLong, prototypeHook, find } from './utils.js';
import Player from './GameClasses/Player.js';

const createProperty = name => ({
    get: function() {
        return this[name];
    },
    set: function(value) {
        this[name] = value;
    }
});

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

        const entity = new BattleEntity;
        Object.defineProperties(BattleEntity.prototype, {
            components_map: createProperty(find(entity, 'map')[0]),
            components: createProperty(find(entity, 'list')[0]),
        })

        const map = new NativeIdentityMap;
        Object.defineProperties(NativeIdentityMap.prototype, {
            map: createProperty(find(map, 'i:0')[0])
        })

        const list = new NativeList;
        Object.defineProperties(NativeList.prototype, {
            array: createProperty(find(list, 'i:0')[0])
        })
    }

    {
        const init = find(BattleEntity.prototype, 'i:0')[1];
        Quaternion.prototype.send = function() {
            return init.apply(this, arguments);
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
        const battleChat = new BattleChatHudComponent;
        Object.defineProperties(BattleChatHudComponent.prototype, {
            isInputActive: createProperty(find(battleChat, 'i:5')[0])
        })
    }

    {
        const body = new Body;
        Object.defineProperties(Body.prototype, {
            movable: createProperty(find(body, 'i:5')[0])
        })
    }

    {
        const user = new User;
        Object.defineProperties(User.prototype, {
            id: createProperty(find(user, 'i:0')[0]),
            crystals: createProperty(find(user, 'i:2')[0]),
            coins: createProperty(find(user, 'i:3')[0]),
            rank: createProperty(find(user, 'i:5')[0]),
            score: createProperty(find(user, 'i:7')[0]),
            gearScore: createProperty(find(user, 'i:8')[0]),
            weaponGS: createProperty(find(user, 'i:9')[0]),
            hullGS: createProperty(find(user, 'i:10')[0]),
            droneGS: createProperty(find(user, 'i:11')[0]),
            resistanceGS: createProperty(find(user, 'i:12')[0]),
            uid: createProperty(find(user, 'i:14')[0]),
            clanTag: createProperty(find(user, 'i:15')[0]),
            hasPremium: createProperty(find(user, 'i:18')[0])
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