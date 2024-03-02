import fuzzySort from 'fuzzysort';
import { keyPressed } from './keyPressing';
import { battleChat } from '../cheatBase/features/battleChat';

export const getStartupType = () => {
    if (location.pathname.includes('/public-deploy')) {
        return 'public-deploy';
    } else if (location.pathname.includes('/main')) {
        return 'main';
    }

    return 'other';
};

export const setPathName = (pathName = '/') => {
    return history.pushState({}, null, pathName);
};

export const execute = (code, type = 'text') => {
    const script = document.createElement('script');
    script[type] = code;
    document.body.appendChild(script);
};

/**
 * author: sabaka-babaka
 */
export const toLong = numberStr => {
    const number = BigInt(numberStr),
        low = Number(BigInt.asIntN(32, number)),
        high = Number(BigInt.asIntN(32, number >> 32n));
    return new Long(low, high);
};

export const getSimpleName = object => {
    return object?.constructor?.$metadata$?.simpleName;
};

export const getNamedClasses = object => {
    if (!object) {
        return;
    }

    const result = {};

    for (const [key, value] of Object.entries(object)) {
        const simpleName = getSimpleName(value);

        if (simpleName && result[simpleName]) {
            for (let index = 0; ; index++) {
                if (result[`${simpleName}:${index}`]) continue;

                result[`${simpleName}:${index}`] = value;
                break;
            }
        } else if (simpleName) result[`${simpleName}`] = value;
    }

    return result;
};

export const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const getPropertyByIndex = (object, index) => {
    return object ? Object.entries(object)[index] : undefined;
};

const getPropertyByName = (object, simpleName, returnName = false) => {
    if (!object) {
        return;
    }

    const classes = getNamedClasses(object);

    if (!classes) {
        return;
    }

    const searchResult = fuzzySort.go(simpleName, Object.keys(classes))?.[0]
        ?.target;

    if (!searchResult) {
        return;
    }

    let name = '';
    for (const [key, value] of Object.entries(object)) {
        if (value === classes[searchResult]) {
            name = key;
            break;
        }
    }

    return returnName ? [name, classes[searchResult]] : classes[searchResult];
};

export const find = (object, selector) => {
    if (!object || !selector) {
        return;
    }

    let result = object;
    selector.split('.').forEach(property => {
        if (!result) {
            return;
        }

        if (
            typeof result[1] === 'object'
                ? result[1][property]
                : result[property]
        ) {
            result = [
                property,
                typeof result[1] === 'object'
                    ? result[1][property]
                    : result[property]
            ];
        } else if (property.slice(0, 2) === 'i:') {
            result = getPropertyByIndex(
                typeof result[1] === 'object' ? result[1] : result,
                property.slice(2, property.length)
            );
        } else {
            result = getPropertyByName(
                typeof result[1] === 'object' ? result[1] : result,
                property,
                true
            );
        }
    });

    return result;
};

export const prototypeHook = (
    constructor,
    selector,
    callBack,
    after = false,
    args = false
) => {
    if (!constructor) {
        return;
    }

    const prototype = constructor.prototype,
        functionName =
            (prototype[selector] && selector) || find(prototype, selector)?.[0];

    if (!functionName) {
        return;
    }

    if (!prototype[`${functionName}_copy`]) {
        prototype[`${functionName}_copy`] = prototype[functionName];
    }

    prototype[functionName] = function () {
        try {
            if (after) {
                const result = prototype[`${functionName}_copy`].apply(
                    this,
                    arguments
                );
                [].push.call(arguments, prototype[`${functionName}_copy`]);
                [].push.call(arguments, result);

                const callBackResult = args
                    ? callBack.call(this, arguments)
                    : callBack.apply(this, arguments);

                if (callBackResult) {
                    return callBackResult;
                }

                return result;
            }

            [].push.call(arguments, prototype[`${functionName}_copy`]);
            const callBackResult = args
                ? callBack.call(this, arguments)
                : callBack.apply(this, arguments);

            if (callBackResult) {
                return callBackResult;
            }

            return prototype[`${functionName}_copy`].apply(this, arguments);
        } catch (e) {
            console.error(e);
        }
    };
};

export const isKeyPressed = key => {
    return battleChat.isInputActive() !== true && keyPressed.isKeyPressed(key);
};

export const pressKey = code => {
    const key = { code: code };
    document.dispatchEvent(new KeyboardEvent('keydown', key));
    document.dispatchEvent(new KeyboardEvent('keyup', key));
    dispatchEvent(new KeyboardEvent('keydown', key));
    dispatchEvent(new KeyboardEvent('keyup', key));
};

// sabaka-babaka
function escapeRegExpSpecialCharacters(str) {
    return str.replace(/[.*+?^{}()|[\]\\]/g, '\\$&');
}

// sabaka-babaka
function replaceMangledNames(str) {
    let reg =
        /(?:".+?")|(?:\b\d+\.\d+\b)|(?:\b\d+\b)|(?:\b(?:break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|toString|equals|hashCode|callableName)\b)|([\w$]+)/g;
    let regExpText = str.replace(reg, (match, group1) => {
        return group1 ? '[\\w$]+' : match;
    });
    return regExpText;
}

// sabaka-babaka
function escapeDollars(str) {
    let reg = /(?:\[\\w\$\]\+)|(\$)/g;
    let regExpText = str.replace(reg, (match, group1) => {
        return group1 ? '\\$' : match;
    });
    return regExpText;
}

// sabaka-babaka
export function makeRegexOfFuncText(text) {
    if (!text) {
        return;
    }
    text = escapeRegExpSpecialCharacters(text);
    text = replaceMangledNames(text);
    text = escapeDollars(text);
    return RegExp(text);
}

// sabaka-babaka
export const regexFinder = (object, regex) => {
    return Object.entries(object).find(([key, value]) =>
        value?.toString?.().match(regex)
    );
};

export const createProperty = name => ({
    get: function () {
        return this[name];
    },
    set: function (value) {
        this[name] = value;
    },
    configurable: true,
    enumerable: true
});

export const defineProperties = (kotlinClass, names) => {
    const object = new kotlinClass();
    const properties = {};

    names.forEach((name, index) => {
        if (!name) {
            return;
        }

        properties[name] = createProperty(find(object, `i:${index}`)[0]);
    });

    Object.defineProperties(kotlinClass.prototype, properties);
};

export const createQueryString = objectParams => {
    let result = '?';

    const searchParams = new URLSearchParams(objectParams);
    Array.from(searchParams).forEach(([key, value], index) => {
        if (index !== 0) {
            result += '&';
        }

        result += `${key}=${value}`;
    });

    return result;
};

export const isKClass = constructor => {
    return !!constructor?.$metadata$?.hasOwnProperty('simpleName');
};

window.isKClass = isKClass;
