import { cheatBase } from '../cheatBase.js';
import { toLong } from '../utils.js';

class Containers {
    /**
     * @param {number} count 
     */
    openContainer = count => cheatBase.dispatch(new OpenLootBoxApply(
        toLong('1931009779283'),
        new ContainerTypeEnum('', 0),
        count
    ))

    /**
     * @param {number} count 
     */
    openUltraContainer = count => cheatBase.dispatch(new OpenLootBoxApply(
        toLong('1931009801522'),
        new ContainerTypeEnum('', 0),
        count
    ))
}

export const containers = new Containers;