import regex from './regex.js';
import { regexFinder } from '../../../shared/utils.js';

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
};
