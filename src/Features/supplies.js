import { cheatBase } from '../cheatBase.js';

class Supplies {
    /**
     * @param {string} supply 
     */
    activateSupplyByName = supply => {
        const supplies = cheatBase.gameClasses.inventoryModel?.items;

        if (!supplies)
            return;

        supplies[supply]();
    }

    getSupplies = () => cheatBase.gameClasses.inventoryModel?.items;
}

export const supplies = new Supplies;