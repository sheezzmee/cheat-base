import { cheatBase } from '..';

class Supplies {
	activateSupplyByName = supply => {
		const supplies = cheatBase.gameClasses.supplies;

		if (!supplies) return;

		supplies[supply]();
	};

	getSupplies = () => cheatBase.gameClasses.supplies;
}

export const supplies = new Supplies();
