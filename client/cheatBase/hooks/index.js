import { find } from '../utils.js';

import battleEntityHooks from './BattleEntity';
import shopHooks from './Shop';
import worldHooks from './World';
import gameModeHooks from './GameMode';
import localTankStateServerSenderComponentHooks from './LocalTankStateServerSenderComponent';
import inventoryModelHooks from './InventoryModel';
import tankSpawnerModelHooks from './TankSpawnerModel';
import defineTankState from './defineTankState';

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

const defineProperties = (kotlinClass, names) => {
    const object = new kotlinClass();
    const properties = {};

    names.forEach((name, index) => {
        if (!name) {
            return;
        }

        properties[name] = createProperty(find(object, `i:${index}`)[0]);
    });

    Object.defineProperties(kotlinClass.prototype, properties);
};

export default () => {
    try {
        battleEntityHooks();
        shopHooks();
        worldHooks();
        gameModeHooks();
        localTankStateServerSenderComponentHooks();
        inventoryModelHooks();
        tankSpawnerModelHooks();
        defineTankState();
    } catch (error) {
        console.error(error);
    }

    defineProperties(Vector3, ['x', 'y', 'z']);
    defineProperties(Quaternion, ['w', 'x', 'y', 'z']);
    defineProperties(WeaponTrigger, [, , , , , 'pulled']);
    defineProperties(SpeedCharacteristicsComponent, [, , , 'specificationId']);
    defineProperties(GetTankState, ['state']);
    defineProperties(ClientTankState, ['name']);
    defineProperties(BattleChatHudComponent, [, , , , , 'isInputActive']);
    defineProperties(Body, [, , , , , 'movable']);

    defineProperties(BodyState, [
        'velocity',
        'orientation',
        'angularVelocity',
        'position'
    ]);

    defineProperties(Store, [
        ,
        'subscribers',
        'lastAction',
        'dispatchFunction',
        'state'
    ]);

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

    TankState.prototype.init = function () {
        this.angularVelocity = new Vector3();
        this.linearVelocity = new Vector3();
        this.orientation = new Vector3();
        this.position = new Vector3();
    };

    for (const key in AlternativaLogger.prototype) {
        AlternativaLogger.prototype[key] = () => {};
    }

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
                    properties[field.name] = createProperty(field.mangledName);
                }
            });

            Object.defineProperties(prototype, properties);
        }
    }
};
