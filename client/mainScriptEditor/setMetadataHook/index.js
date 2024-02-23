import { modifications } from '..';
import restoreNameViaRegex from './restoreNameViaRegex';
import putConstructorInWindow from './putConstructorInWindow';
import explodeToString from './explodeToString';
import restoreModels from './restoreModels';
import restoreNamesViaNew from './restoreNamesViaNew';
import defineHelpers from './defineHelpers';
import { cheatBase } from '../../cheatBase';

export const lastSimpleName = 'StartScreenComponentStyle';

window.setMetadata = (constructor, name) => {
    if (!constructor) {
        return;
    }

    requestAnimationFrame(() => {
        const prototype = constructor.prototype;
        name = explodeToString(name, prototype);

        if (!name && !(name = restoreNameViaRegex(constructor))) {
            return;
        }

        if (name === lastSimpleName) {
            restoreNamesViaNew();
            cheatBase.init();
        }

        restoreModels(constructor, name);
        putConstructorInWindow(constructor, name);
        defineHelpers(prototype);
    });
};

// сори за ебланство но import вызывается раньше чем export))
requestAnimationFrame(() => {
    modifications.push(code => {
        return code.replaceAll(
            /(?<begin>function \w+\(\w,\w,\w,\w,\w,\w,\w,\w(?:,\w)?\)\{)(?<end>null!=\w&&\(\w\.prototype=Object\.create\(\w\.prototype\))/g,
            `$<begin>window.setMetadata.apply(null, arguments);$<end>`
        );
    });
});
