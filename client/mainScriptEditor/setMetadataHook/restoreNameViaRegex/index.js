import simpleNames from './simpleNames';
import { getPropertyByIndex } from '../../../shared/utils';

export default constructor => {
    let name;

    for (const [i, [simpleName, index, regex]] of simpleNames.entries()) {
        if (index === -1 && constructor.toString().match(regex)) {
            name = simpleName;
            simpleNames.splice(i, 1);
            window.simpleNames = simpleNames;
            break;
        }

        if (
            getPropertyByIndex(constructor.prototype, index)?.[1]
                ?.toString()
                .match(regex)
        ) {
            name = simpleName;
            simpleNames.splice(i, 1);
            window.simpleNames = simpleNames;
            break;
        }
    }

    return name;
};
