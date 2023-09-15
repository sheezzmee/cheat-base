import fuzzySort from 'fuzzysort';

/**
 * author: sabaka-babaka
 */
 export const toLong = numberStr => {
    const number = BigInt(numberStr),
          low = Number(BigInt.asIntN(32, number)),
          high = Number(BigInt.asIntN(32, number >> 32n));
    return new Long(low, high);
}

const getMainScript = () => {
    const scripts = document.getElementsByTagName('script');
    return scripts.item(scripts.length - 1);
}

/**
 * author: sabaka-babaka
 */
const modifyScript = script => {
    const pattern = /(?<begin>function \w+\(\w,\w,\w,\w,\w,\w,\w,\w\)\{)(?<end>null!=\w&&\(\w\.prototype=Object\.create\(\w\.prototype\))/;
    script = script.replace(pattern, `$<begin>(function(s,w){if(w==='StartScreenComponentStyle'){const event=new CustomEvent("cheat-base-initialized",{bubbles:!0});dispatchEvent(event);}if(w&&s)if(window[w]){for(let i=0;;i++)if(!window[w+"_"+i]){window[w+"_"+i]=s;break}}else window[w]=s}).apply(this, arguments);$<end>`);
    return script;
}

export const downloadScript = () => {
    unsafeWindow.define = () => {
        delete unsafeWindow.define;
        
        const mainScript = getMainScript();
        fetch(mainScript.src).then(async response => {
            mainScript.remove();
            const script = document.createElement('script');
            script.text = modifyScript(await response.text());
            document.body.appendChild(script);
        });
    }
    unsafeWindow.define.amd = true;
}

export const getSimpleName = object => object?.constructor?.$metadata$?.simpleName;

export const getNamedClasses = object => {
    const result = {};

    for (const [key, value] of Object.entries(object)) {
        const simpleName = getSimpleName(value);

        if (simpleName && result[simpleName]) {
            for (let index = 0;; index++) {
                if (result[`${simpleName}:${index}`])
                    continue;

                result[`${simpleName}:${index}`] = value;
                break;
            }
        } else if (simpleName) 
            result[`${simpleName}`] = value;
    }

    return result;
}

export const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getPropertyByIndex = (object, index) => object ? Object.entries(object)[index] : undefined;

const getPropertyByName = (object, simpleName, returnName = false) => {
    if (!object)
        return;

    const named = getNamedClasses(object);

    if (!named)
        return;

    const results = fuzzySort.go(simpleName, Object.keys(named));

    if (!results || !results[0]?.target)
        return;

    let name = '';
    for (const [key, obj] of Object.entries(object)) {
        if (obj === named[results[0].target]) {
            name = key;
            break;
        }
    }

    return returnName ? [name, named[results[0].target]] : named[results[0].target];
}

export const find = (object, selector) => {
    if (!object || !selector)
        return;

    let result = object;
    selector.split('.').forEach(property => {
        if (!result)
            return;

        if (typeof result[1] === 'object' ? result[1][property] : result[property])
            result = [property, typeof result[1] === 'object' ? result[1][property] : result[property]];
        else if (property.slice(0, 2) === 'i:')
            result = getPropertyByIndex(typeof result[1] === 'object' ? result[1] : result, property.slice(2, property.length));
        else
            result = getPropertyByName(typeof result[1] === 'object' ? result[1] : result, property, true);
    });

    return result;
};

export const prototypeHook = (constructor, selector, callBack, after = false) => {
    const prototype = constructor.prototype,
        functionName = ((prototype[selector] && selector) || find(prototype, selector)?.[0]);

    if (!functionName)
        return;

    !prototype[`${functionName}_copy`] && (prototype[`${functionName}_copy`] = prototype[functionName]);

    prototype[functionName] = function () {
        if (after) {
            const result = prototype[`${functionName}_copy`].apply(this, arguments);
            [].push.call(arguments, result);
            const callBackResult = callBack.apply(this, arguments);

            if (callBackResult)
                return callBackResult;

            return result;
        }

        const callBackResult = callBack.apply(this, arguments);

        if (callBackResult)
            return callBackResult;

        return prototype[`${functionName}_copy`].apply(this, arguments);
    }
}

export const proxyHook = (object, selector, callBack) => {
    const functionName = ((object[selector] && selector) || find(object, selector)?.[0]);

    if (!functionName)
        return;

    !object[`${functionName}_copy`] && (object[`${functionName}_copy`] = object[functionName]);

    object[functionName] = new Proxy({}, {
        get: (target, prop, receiver) => function () {
            const callBackResult = callBack(prop, arguments);

            if (callBackResult)
                return callBackResult;
            
            return object[`${functionName}_copy`][prop].apply(undefined, arguments);
        }
    })
}