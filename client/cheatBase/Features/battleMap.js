import { cheatBase } from '..';
import { find } from '../utils.js';

class BattleMap {
	isSpace = () =>
		find(cheatBase.gameClasses.world, 'physicsScene.vector3.i:2')?.[1] === -300;

	getKillZone = () => {
		const killZone = {
			maxX: 0,
			maxY: 0,
			maxZ: 0,
			minX: 0,
			minY: 0,
			minZ: 0,
			boundZ: 0
		};

		const mapBounds = find(
			cheatBase.gameClasses.world,
			'physicsScene.collisionDetectorImpl.uniformGrid.aabb'
		)?.[1];

		if (!mapBounds) return;

		const bounds = {
			maxX: find(mapBounds, 'i:3')[1],
			maxY: find(mapBounds, 'i:4')[1],
			maxZ: find(mapBounds, 'i:5')[1],
			minX: find(mapBounds, 'i:0')[1],
			minY: find(mapBounds, 'i:1')[1],
			minZ: find(mapBounds, 'i:2')[1]
		};

		killZone.maxX = bounds.maxX + 499;
		killZone.maxY = bounds.maxY + 499;
		killZone.maxZ = bounds.maxZ + (this.isSpace() ? 3399 : 1999);
		killZone.minX = bounds.minX - 499;
		killZone.minY = bounds.minY - 499;
		killZone.minZ = bounds.minZ - 99;
		killZone.boundZ = bounds.maxZ;
		return killZone;
	};
}

export const battleMap = new BattleMap();
