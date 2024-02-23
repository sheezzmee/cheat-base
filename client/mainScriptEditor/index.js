export const modifications = [];

import './entranceHashKeyFixer';
import './setMetadataHook';
import './crashMapFixer';
import './URLFixer';
import './getExports'

export const editScript = code => {
    for (const callback of modifications) {
        code = callback(code);
    }
    window.script = code;
    return code;
};
