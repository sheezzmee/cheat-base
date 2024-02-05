import globalConfig from '../../shared/config';

const config = Object.entries(globalConfig.scriptLoader.autoConfig.settings);

export const initAutoConfig = () => {
    const getItem = localStorage.getItem;
    localStorage.getItem = function (keyName) {
        for (const [key, value] of config) {
            if (keyName.includes(key)) {
                return value;
            }
        }
        return getItem.apply(this, arguments);
    };
};
