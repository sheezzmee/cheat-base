import { cheatBase } from '..';

class Supplies {
    activateSupplyByName = supply => {
        const supplies = cheatBase.battleClasses?.supplies;

        if (!supplies) {
            return;
        }

        supplies[supply]();
    };

    getSupplies = () => {
        return cheatBase.battleClasses?.supplies;
    };
}

export const supplies = new Supplies();
