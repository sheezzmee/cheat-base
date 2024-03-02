import {
    defineProperties,
    prototypeHook,
    find,
    createProperty
} from '../../shared/utils.js';
import battleEntityHooks from './BattleEntity';
import shopHooks from './Shop';
import worldHooks from './World';
import gameModeHooks from './GameMode';
import localTankStateServerSenderComponentHooks from './LocalTankStateServerSenderComponent';
import inventoryModelHooks from './InventoryModel';
import tankSpawnerModelHooks from './TankSpawnerModel';
import defineTankState from './defineTankState';
import { cheatBase } from '../index.js';

export default () => {
    try {
        battleEntityHooks();
        shopHooks();
        worldHooks();
        gameModeHooks();
        localTankStateServerSenderComponentHooks();
        defineTankState();
    } catch (error) {
        console.error(error);
    }

    defineProperties(BattleEntity, [, , , , , 'components']);
    defineProperties(NativeList, ['array']);
    defineProperties(Vector3, ['x', 'y', 'z']);
    defineProperties(Quaternion, ['w', 'x', 'y', 'z']);
    defineProperties(WeaponTrigger, [, , , , , 'pulled']);
    defineProperties(SpeedCharacteristicsComponent, [, , , 'specificationId']);
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

    TankState.prototype.init = function (useBodyState = true) {
        this.angularVelocity = new Vector3();
        this.linearVelocity = new Vector3();
        this.orientation = new Vector3();
        this.position = new Vector3();

        if (useBodyState) {
            const player = cheatBase.battleClasses.localPlayer;

            if (player) {
                const physics = player.components?.['TankPhysicsComponent'];

                if (physics) {
                    const state = find(physics.__proto__, 'i:13')?.[1]?.call(
                        physics
                    );

                    if (state) {
                        find(TankStateUtils.prototype, 'i:0')[1].call(
                            null,
                            this,
                            state
                        );
                    }
                }
            }
        }
    };

    for (const key in AlternativaLogger.prototype) {
        AlternativaLogger.prototype[key] = () => {};
    }

    addEventListener('cheat-base-ready', () => {
        prototypeHook(UidNotifierModel, 'i:1', users => {
            for (const userData of users.toArray()) {
                const id = find(userData, 'i:0')[1].string;
                const uid = find(userData, 'i:1')[1];

                if (!cheatBase.users.hasOwnProperty(id)) {
                    cheatBase.users[id] = {};
                }

                cheatBase.users[id].uid = uid;
            }
        });

        prototypeHook(ClanNotifierModel, 'i:3', userData => {
            for (const clanData of userData.toArray()) {
                const clanTag = find(clanData, 'i:3')[1];
                const id = find(clanData, 'i:10')[1].string;

                if (!cheatBase.users.hasOwnProperty(id)) {
                    cheatBase.users[id] = {};
                }

                cheatBase.users[id].clanTag = clanTag;
            }
        });

        inventoryModelHooks();
        tankSpawnerModelHooks();
    });

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
