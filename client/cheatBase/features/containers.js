import { cheatBase } from '../';

const getKeyTypeEnum = type => {
    switch (type?.toUpperCase()) {
        case 'STANDARD':
            return new KeyTypeEnum('', 0);
        case 'RARE':
            return new KeyTypeEnum('', 1);
        case 'EPIC':
            return new KeyTypeEnum('', 2);
        case 'LEGENDARY':
            return new KeyTypeEnum('', 3);
    }

    return new KeyTypeEnum('', 2);
};

class Containers {
    /**
     * @param {number} count
     * @param {'STANDARD' | 'RARE' | 'EPIC' | 'LEGENDARY'} type
     */
    openContainer = (count = 50, type = 'EPIC') => {
        if (count > 50) {
            count = 50;
        } else if (count < 1) {
            count = 1;
        }

        cheatBase.dispatch(new OpenKeyedContainer(count, getKeyTypeEnum(type)));
    };
}

export const containers = new Containers();
