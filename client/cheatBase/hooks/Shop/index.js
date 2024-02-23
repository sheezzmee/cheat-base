import regex from './regex.js';
import { regexFinder, prototypeHook } from '../../../shared/utils.js';

export default () => {
    const initFunction = regexFinder(Shop.prototype, regex.init);

    prototypeHook(Shop, initFunction[0], function () {
        this.enabled = true;
    });
};
