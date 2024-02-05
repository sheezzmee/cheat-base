let config = {
    cheatBase: {
        dispatchLog: false,
        scriptLoader: {
            shizoval: false,
            autoConfig: {
                enabled: true,
                settings: {
                    anisotropicFiltering: '4',
                    antialiasing: 'true',
                    decals: 'MAXIMUM',
                    dust: 'true',
                    dynamicLighting: 'true',
                    dynamicShadows: 'true',
                    enableFog: 'true',
                    fog: 'false',
                    qualityDetectCompleted: 'true',
                    resolutionDownscale: '3',
                    shadowsOfTank: 'true',
                    showFPSandPing: 'true',
                    showSkybox: 'true',
                    softParticles: 'true',
                    ssao: 'true',
                    treesQuality: '3',
                    auto_suicide: 'false',
                    battle_ui_scale: '50',
                    is_centered_layout: 'false',
                    show_damage: 'true',
                    show_dot: 'false',
                    show_status_name: 'false',
                    receive_pm_only_from_friends: 'false',
                    show_chat: 'true',
                    show_notification: 'true',
                    ambientVolume: '50',
                    blurMute: 'false',
                    hitmarkEnemyVolume: '50',
                    hitmarkPlayerVolume: '50',
                    masterVolume: '0',
                    musicVolume: '50',
                    sfxVolume: '50',
                    uiVolume: '100'
                }
            }
        }
    }
};

const flattenObject = (obj, parentKey = '') => {
    let result = {};

    for (const key in obj) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            result = { ...result, ...flattenObject(obj[key], newKey) };
        } else {
            result[newKey] = obj[key];
        }
    }

    return result;
};

const unflattenObject = obj => {
    let result = {};

    for (const key in obj) {
        const keys = key.split('.');
        keys.reduce((acc, currentKey, index) => {
            if (!acc[currentKey]) {
                acc[currentKey] = {};
            }
            if (index === keys.length - 1) {
                acc[currentKey] = obj[key];
            }
            return acc[currentKey];
        }, result);
    }

    return result;
};

export const saveConfig = () => {
    const flattenedConfig = flattenObject(config);

    for (const [key, value] of Object.entries(flattenedConfig)) {
        localStorage.setItem(key, value);
    }
};

const loadConfig = () => {
    const flattenedConfig = flattenObject(config);

    for (const key of Object.keys(flattenedConfig)) {
        const storedValue = localStorage.getItem(key);

        if (storedValue !== null) {
            flattenedConfig[key] =
                typeof flattenedConfig[key] === 'boolean'
                    ? storedValue === 'true'
                    : typeof flattenedConfig[key] === 'number'
                    ? parseFloat(storedValue)
                    : storedValue;
        }
    }

    config = unflattenObject(flattenedConfig);
};

loadConfig();

export default config.cheatBase;
