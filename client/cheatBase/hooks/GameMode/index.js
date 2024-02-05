import regex from './regex.js';
import { find, regexFinder, prototypeHook } from '../../../shared/utils.js';
import { cheatBase } from '../..';

export default () => {
    const initComponent = regexFinder(GameMode.prototype, regex.initComponent);

    prototypeHook(GameMode, initComponent[0], function () {
        if (!cheatBase.battleClasses.gameMode) {
            cheatBase.battleClasses.gameMode = this;
            cheatBase.battleClasses.game = find(this, 'entity')?.[1];

            setTimeout(() => {
                cheatBase.battleClasses.hud = find(this, 'entity:0')?.[1];
            }, 100);
        }
    });
};
