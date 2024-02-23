import { modifications } from '..';

window.getSortedExports = () => {
    const sortedExports = {};

    for (const [key, value] of Object.entries(window.exports)) {
        if (!value.exports?.$_$) {
            continue;
        }

        sortedExports[key] = value.exports.$_$;
    }

    return sortedExports;
};

// сори за ебланство но import вызывается раньше чем export))
requestAnimationFrame(() => {
    modifications.push(code => {
        return code.replace(
            /(?<begin>(?<exports>[\w$])+=\{\};)(?<end>function [\w$]+\([\w$]+\)\{var [\w$]+=[\w$]+\[[\w$]+\];if\(void 0!==[\w$]+\)return [\w$]+\.[\w$]+;)/,
            '$<begin>window.exports=$<exports>;$<end>'
        );
    });
});
