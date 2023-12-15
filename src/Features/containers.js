import { cheatBase } from '../cheatBase.js';
import { toLong } from '../utils.js';

class Containers {
	openContainer = (id, count) =>
		cheatBase.dispatch(
			new OpenLootBoxApply(toLong(id), new ContainerTypeEnum('', 0), count)
		);
}

export const containers = new Containers();
