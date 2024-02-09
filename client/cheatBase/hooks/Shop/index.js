import regex from './regex.js';
import { find, regexFinder, prototypeHook } from '../../../shared/utils.js';

export default () => {
    const initFunction = regexFinder(Shop.prototype, regex.init);

    let enabled;
    prototypeHook(Shop, initFunction[0], function () {
        if (!enabled) {
            enabled = find(this, 'i:9')[0];
        }

        this[enabled] = true;
    });
};
