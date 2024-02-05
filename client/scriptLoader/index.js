import { execute } from '..';
import { initAutoConfig } from './scripts/autoConfig';
import config from '../shared/config';

export const scriptLoader = () => {
    if (config.scriptLoader.autoConfig.enabled) {
        initAutoConfig();
    }

    if (config.scriptLoader.shizoval) {
        execute('/public/scripts/shizoval.min.js', 'src');
    }
};
