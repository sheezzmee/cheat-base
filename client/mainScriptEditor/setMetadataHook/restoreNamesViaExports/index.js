import { isKClass } from '../../../shared/utils';
import putConstructorInWindow from '../putConstructorInWindow';
import exports from './exports';

export default () => {
    const sortedExports = getSortedExports();
    for (const [key, moduleInfo] of Object.entries(exports)) {
        moduleInfo.forEach(() => {
            const module = sortedExports[key];

            if (!module) {
                console.log(`${key} модуль не найден`);
                return;
            }

            for (const value of Object.values(module)) {
                if (isKClass(value)) {
                    putConstructorInWindow(value, moduleInfo.shift());
                    return;
                }
            }
        });
    }
};
