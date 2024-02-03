import { execute } from '.';
import { initAutoConfig } from './autoConfig';
import config from './config';

export const scriptLoader = () => {
    if (config.scriptLoader.autoConfig.enabled) {
        initAutoConfig();
    }

    if (config.scriptLoader.shizoval) {
        execute('scripts/shizoval.min.js', 'src');
    }
};
