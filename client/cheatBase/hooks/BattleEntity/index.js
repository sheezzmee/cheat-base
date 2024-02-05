import regex from './regex.js';
import { find, regexFinder } from '../../../shared/utils.js';
import { createProperty } from '../index.js';

export default () => {
    const sendFunction = regexFinder(BattleEntity.prototype, regex.send);
    const onFunction = regexFinder(BattleEntity.prototype, regex.on);

    BattleEntity.prototype.send = function () {
        return sendFunction[1].apply(this, arguments);
    };

    BattleEntity.prototype.on = function (
        messageClass,
        handler,
        priority = 0,
        dispatchOnce = false
    ) {
        if (messageClass.$metadata$?.$kClass$) {
            messageClass = messageClass.$metadata$.$kClass$;
        } else {
            const kClass = new SimpleKClassImpl(messageClass);
            messageClass.$metadata$.$kClass$ = kClass;
            return this.on(messageClass, priority, dispatchOnce, handler);
        }

        return onFunction[1].call(
            this,
            messageClass,
            priority,
            dispatchOnce,
            handler
        );
    };

    const entity = new BattleEntity();
    Object.defineProperties(BattleEntity.prototype, {
        components_map: createProperty(find(entity, 'map')[0]),
        components: createProperty(find(entity, 'list')[0])
    });

    const map = new NativeIdentityMap();
    Object.defineProperties(NativeIdentityMap.prototype, {
        map: createProperty(find(map, 'i:0')[0])
    });

    const list = new NativeList();
    Object.defineProperties(NativeList.prototype, {
        array: createProperty(find(list, 'i:0')[0])
    });
};
