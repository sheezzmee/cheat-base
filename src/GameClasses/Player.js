import { cheatBase } from '../cheatBase.js';
import { find } from '../utils.js';

export default class Player {
    entity = null;
    local = false;
    body = null;
    state = null;
    map = null;
    id = new GetPlayerId;
    team = new GetTeamQuery;

    _name = null;

    constructor(entity) {
        this.entity = entity;

        entity.send(this.id);
        entity.send(this.team);
        
        this.id = find(this.id, 'long')[1].toString();
        this.team = find(this.team, 'team.i:0')[1];
        this.map = find(entity, 'map.i:0')[1];
        this.body = find(this.get(TankPhysicsComponent), 'body')[1];
        this.state = find(this.body, 'state')[1];
        
        const localLong = find(cheatBase.store, 'state.user.long')[1].toString();
        if (this.id === localLong)
            this.local = true;
    }

    get isEnemy() {
        if (this.team === 'NONE' && this.local === false)
            return true;
            
        return cheatBase.gameClasses.localPlayer.team !== this.team;
    }

    get tankState() {
        const tankState = new GetTankState;
        this.send(tankState);
        return tankState.state.name;
    }

    get name() {
        if (!this._name) {
            const title = this.get(UserTitleComponent_0);

            if (title) {
                const name = find(title, 'userTitleConfiguration.i:0')?.[1],
                    tag = find(title, 'userTitleConfiguration.i:1')?.[1];
    
                this._name = `${tag ? `[${tag}] ` : ''}${name}`;
            } else {
                const name = find(cheatBase.store, 'state.user.i:14')?.[1],
                    tag = find(cheatBase.store, 'state.user.i:15')?.[1];
    
                this._name = `${tag ? `[${tag}] ` : ''}${name}`;
            }
        }

        return this._name;
    }

    send = message => this.entity?.send(message);
    on = (messageClass, priority, dispatchOnce, handler) => this.entity?.on(
        messageClass, priority, dispatchOnce, handler
    );
    get = kClass => {
        const array = this.map?.get(kClass.$metadata$.$kClass$)?.array;

        if (array?.length === 1)
            return array[0];

        return array;
    }
}