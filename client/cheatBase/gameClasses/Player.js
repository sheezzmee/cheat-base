import { cheatBase } from '../index.js';
import { find, getNamedClasses } from '../../shared/utils.js';

let destroy;
export default class Player extends Event {
    entity = null;
    local = false;
    body = null;
    id = new GetPlayerId();
    team = new GetTeamQuery();
    components = [];
    name = null;

    constructor(entity, isLocal) {
        super('onPlayerCreated');
        this.entity = entity;

        entity.send(this.id);
        entity.send(this.team);

        this.components = getNamedClasses(this.entity.components.array);
        this.id = find(this.id, 'long')[1].toString();
        this.team = find(this.team, 'i:0.i:0')?.[1];
        this.body = find(this.components['TankPhysicsComponent'], 'body')[1];
        this.body.state = find(this.body, 'state')[1];

        /*try {
            const { uid, clanTag } = cheatBase.users[this.id];
            this.name = `${clanTag ? `[${clanTag}] ` : ''}${uid}`;
        } catch (e) {
            this.on(ConfigureUserTitleMessage, message => {
                const userName = find(message, 'title.i:0')[1],
                    clanTag = find(message, 'title.i:1')[1];

                this.name = `${clanTag ? `[${clanTag}] ` : ''}${userName}`;
            });
        }*/

        if (isLocal) {
            this.local = true;
            cheatBase.battleClasses.localPlayer = this;
        }

        if (!destroy) {
            destroy = find(this.entity, '__proto__.i:11')[0];
        }

        const __this__ = this;
        this.entity.destroy_copy = this.entity[destroy];
        this.entity[destroy] = function () {
            if (__this__.local) {
                cheatBase.battleClasses.localPlayer = null;
            }

            cheatBase.battleClasses.players =
                cheatBase.battleClasses.players.filter(
                    player => player.id !== __this__.id
                );

            return this.destroy_copy.apply(this, arguments);
        };

        dispatchEvent(this);

        this.on(ChangeTeamMessage, message => {
            this.team = find(message, 'i:0.i:0')[1];
        });
    }

    get isEnemy() {
        if (this.team === 'NONE' && this.local === false) return true;

        return cheatBase.battleClasses.localPlayer?.team !== this.team;
    }

    get tankState() {
        const tankState = new GetTankState();
        this.send(tankState);
        return tankState.state.name;
    }

    sendState = state => {
        if (!this.local)
            throw new Error(
                'пытаешься отправить танкстейт не локального игрока'
            );

        if (!this.serverSender)
            this.serverSender =
                this.components['LocalTankStateServerSenderComponent'];

        const sendState = cheatBase.utils.regexFinder(
            TankModel.prototype,
            /function\([\w$]+,[\w$]+,[\w$]+\)\{this\.[\w$]+\(\)\.[\w$]+\([\w$]+,[\w$]+\([\w$]+\),[\w$]+\)\}/
        )[0];
        this.serverSender.serverInterface[sendState](
            cheatBase.battleClasses.world.physicsTime,
            this.serverSender.speedCharacteristics.specificationId,
            state
        );
    };

    send = message => {
        return this.entity?.send(message);
    };

    on = (messageClass, handler, priority = 0, dispatchOnce = false) => {
        return this.entity?.on(messageClass, handler, priority, dispatchOnce);
    };
}
