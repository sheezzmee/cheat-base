import { cheatBase } from './cheatBase';
import models from './shared/models';
import simpleNames from './shared/simpleNames';
import enums from './shared/enums';
import {
    getSimpleName,
    getNamedClasses,
    makeRegexOfFuncText,
    createProperty,
    getPropertyByIndex,
    prototypeHook,
    find
} from './shared/utils';
import inventoryModelHooks from './cheatBase/hooks/InventoryModel';
import tankSpawnerModelHooks from './cheatBase/hooks/TankSpawnerModel';

window.shouldSendCommand = true;
const modifySendCommandFunction = script => {
    let sendCommandFuncTextRe =
        /function\(\w+\)\{if\(this\.\w+\.\w+\(\)\)return \w+\(\);if\(this\.\w+\.equals\(\w+\(\)\)\)\{var \w+=\w+\(\)\.\w+\(\w+\(\)\);!function\(\w+,\w+,\w+\)\{var \w+\=null\!\=\w+&&\w+\(\w+,\w+\),\w+=\w+\(\)\.\w+\(\w+\(\)\);\w+\.\w+\.\w+\(\w+,\w+\),\w+\.\w+\(\);var \w+=\w+\(\)\.\w+\(\w+\(\)\);\w+\(\w+\)\.\w+\(\w+,\w+\),\w+\(\)\.\w+\(\w+\),\(\w+\?\w+\(\)\.\w+\:\w+\.\w+\)\.\w+\(\w+,\w+\),\w+\(\)\.\w+\(\w+\)\}\(this,\w+,\w+\),\w+\.\w+\(\);var \w+\=new DataView\(\w+\.\w+\.buffer,0,\w+\.\w+\);this\.\w+\.send\(\w+\),\w+\(\)\.\w+\(\w+\)\}\}/;
    let sendCommandFuncPartsRe =
        /function\((?<argName>\w+)\){(?<returnIfClosed>if.+?return \w+\(\));if\((?<isConnected>.+?equals\(\w+\(\)\))\)\{(?<declareOutputBufferVar>.+?)=(?<getBufferFromPool>.+?);!(?<writeCommand>function.+?\(this,\w+,\w+\)),(?<flipOutputBuffer>.+?);(?<sendDataView>var.+?send\(\w+\))/;
    let sendCommandFuncText = script.match(sendCommandFuncTextRe)[0];
    let parts = sendCommandFuncText.match(sendCommandFuncPartsRe).groups;

    let modifiedSendCommand = `
	function(${parts.argName}) {
		${parts.returnIfClosed};
		if (${parts.isConnected}) {
			${parts.declareOutputBufferVar} = this.getOutputBuffer();
			let res = ${parts.writeCommand};
			if (window.shouldSendCommand) {
				${parts.flipOutputBuffer};
				${parts.sendDataView};
				this.clearOutputBuffer();
			}
		}
	}
	`;
    return script.replace(sendCommandFuncTextRe, modifiedSendCommand);
};

const pushClassToGlobal = (constructor, name) => {
    if (!window[name]) {
        window[name] = constructor;
        return;
    }

    if (window[name] && window[name] === constructor) return;

    if (window[name] && window[name] !== constructor) {
        for (let i = 0; ; i++) {
            const nameWithIndex = `${name}_${i}`;
            if (window[nameWithIndex] && window[nameWithIndex] === constructor)
                return;

            if (!window[nameWithIndex]) {
                window[nameWithIndex] = constructor;
                return;
            }
        }
    }
};

const explodeString = (name, prototype) => {
    const string = prototype.toString.toString();
    const fields = Array.from(
        string.matchAll(
            /(?:(?:\w+)="\+this\.(?:\w+)\.)|(?:(?:\w+)="\+this\.(?:\w+)\()|(?:(?<name>\w+)="\+(?:\w+?\()?this\.(?<mangledName>\w+)\)?)/g
        )
    ).map(field => field.groups);

    if (!name) {
        name =
            string.match(/return"(\w+)/)?.[1] ||
            string.match(/function\(\)\{var [\w$]+="(\w+) \[/)?.[1];
    }

    const properties = {};
    fields.forEach(field => {
        if (field.name && field.mangledName) {
            properties[field.name] = createProperty(field.mangledName);
        }
    });

    Object.defineProperties(prototype, properties);
    return name;
};

const defineHelpers = prototype => {
    Object.defineProperties(prototype, {
        simpleName: {
            get: function () {
                if (!this) return;
                return getSimpleName(this);
            }
        },
        namedClasses: {
            get: function () {
                if (!this) return;
                return getNamedClasses(this);
            }
        },
        entries: {
            get: function () {
                if (!this) return;
                return Object.entries(this);
            }
        },
        string: {
            get: function () {
                if (!this || !this.toString) return;
                return this.toString();
            }
        }
    });
};

window.classes = [];
window.setMetadata = (constructor, name) => {
    requestAnimationFrame(() => {
        /*if (getSimpleName(constructor.prototype?.__proto__) === 'Enum') {
            classes.push(name);
        }*/
        const prototype = constructor.prototype;
        name = explodeString(name, prototype);

        if (!name) {
            for (const [simpleName, index, regex] of simpleNames) {
                if (index === -1 && constructor.toString().match(regex)) {
                    name = simpleName;
                    break;
                }

                if (
                    getPropertyByIndex(prototype, index)?.[1]
                        ?.toString()
                        .match(regex)
                ) {
                    name = simpleName;
                    break;
                }
            }

            if (!name) {
                if (
                    getSimpleName(constructor.prototype?.__proto__) === 'Enum'
                ) {
                    name = enums.shift();
                    window.enums = enums;
                }

                if (!name) {
                    return;
                }
            }
        }

        constructor.$metadata$.simpleName = name;

        if (name === 'StartScreenComponentStyle') {
            cheatBase.init();
        }

        if (name === 'ModelsRegistryImpl') {
            prototypeHook(constructor, 'i:5', function (model) {
                try {
                    const id = find(model, 'i:5')[1].string;
                    const name = models[id]?.name;
                    const server = models[id]?.server;

                    if (!name) {
                        return;
                    }

                    window[name] = model.__proto__.constructor;
                    window[`${name}Base`] =
                        model.__proto__.__proto__.constructor;
                    window[`${name}Server`] = find(
                        model,
                        `i:${server}`
                    )[1].__proto__.constructor;
                    model.__proto__.constructor.$metadata$.simpleName = name;

                    if (name === 'InventoryModel') {
                        try {
                            inventoryModelHooks();
                        } catch (error) {
                            console.error(error);
                        }
                    }

                    if (name === 'TankSpawnerModel') {
                        try {
                            tankSpawnerModelHooks();
                        } catch (error) {
                            console.error(error);
                        }
                    }

                    if (!cheatBase.gameClasses.models) {
                        cheatBase.gameClasses.models = [];
                    }

                    cheatBase.gameClasses.models.push(model);
                } catch (error) {
                    console.error(error);
                }
            });
        }
        defineHelpers(prototype);
        pushClassToGlobal(constructor, name);
        classes.push(name);
    });
};

export const modifyScript = (script, url) => {
    url = url.replace('https://', '');
    script = script.replaceAll(
        '"/play/"',
        `"${window.proxy || 'https://'}${url}/"`
    );
    script = script.replaceAll(
        '"/browser-public/"',
        `"${window.proxy || 'https://'}${url.replace('index.html', '')}"`
    );
    script = script.replaceAll('new Image;', 'new Image;e.crossOrigin = "";');

    // получение всех конструкторов
    script = script.replaceAll(
        /(?<begin>function \w+\(\w,\w,\w,\w,\w,\w,\w,\w(?:,\w)?\)\{)(?<end>null!=\w&&\(\w\.prototype=Object\.create\(\w\.prototype\))/g,
        `$<begin>window.setMetadata.apply(null, arguments);$<end>`
    );

    // фикс краш мап
    script = script.replace(
        /(?<begin>\(\)\)(?<clearBuffer>\w+\.\w+\(\),\w+\.\w+\(\));else try\{var (?<objectId>\w)\=\w\.\w+\.\w+\(\),(?<methodId>\w)\=\w\.\w+\.\w+\(\),\w\=this\.\w+\(\w\);.+?catch\((?<exceptionArg>\w+)\){)(?<catchBody>.+?)(?<end>}finally)/,
        '$<begin>$<clearBuffer>;$<end>'
    );

    // хук отправки пакетов
    /*script = modifySendCommandFunction(script);
    script = script.replace(
        /function (?<allocateFuncName>[$\w]+)\([$\w]+\)\{return function\([$\w]+,[$\w]+\)\{return [$\w]+\([$\w]+,[$\w]+,[$\w]+\([$\w]+\([$\w]+\)\)\)\}\([$\w]+,new DataView\(new ArrayBuffer\([$\w]+\)\)\)\}/,
        '$&window.allocateByteBuffer=$<allocateFuncName>;'
    );*/

    return script;
};
