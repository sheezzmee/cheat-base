import regex from './regex.js';
import { find, regexFinder, prototypeHook } from '../../../shared/utils.js';
import { cheatBase } from '../..';

export default () => {
    const addInventory = regexFinder(
        InventoryModel.prototype,
        regex.addInventory
    );

    let supply;
    prototypeHook(
        InventoryModel,
        addInventory[0],
        function (supplyType, count, activateOnServerFunction) {
            !supply && (supply = find(supplyType, 'i:0')[0]);
            !cheatBase.battleClasses.supplies &&
                (cheatBase.battleClasses.supplies = {});

            cheatBase.battleClasses.supplies[supplyType[supply]] =
                activateOnServerFunction;
        }
    );
};
