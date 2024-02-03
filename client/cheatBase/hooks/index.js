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
    },
    configurable: true,
    enumerable: true
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
            specificationId: createProperty(
                find(speedCharacteristics, 'i:3')[0]
            )
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

    {
        for (const key in window) {
            if (window[key]?.prototype?.constructor?.$metadata$) {
                const prototype = window[key].prototype;
                const string = prototype.toString.toString();
                const fields = Array.from(
                    string.matchAll(
                        /(?:(?:\w+)="\+this\.(?:\w+)\.)|(?:(?:\w+)="\+this\.(?:\w+)\()|(?:(?<name>\w+)="\+(?:\w+?\()?this\.(?<mangledName>\w+)\)?)/g
                    )
                ).map(field => field.groups);

                const properties = {};
                fields.forEach(field => {
                    if (field.name && field.mangledName) {
                        properties[field.name] = createProperty(
                            field.mangledName
                        );
                    }
                });

                Object.defineProperties(prototype, properties);
            }
        }
    }
};
