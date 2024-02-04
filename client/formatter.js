import { getSimpleName } from './cheatBase/utils';

const valueToString = value => {
    const name = getSimpleName(value);
    switch (typeof value) {
        case 'function':
            return 'ƒ';
        case 'object':
            if (Array.isArray(value)) {
                return `Array(${value.length})`;
            } else if (value === null) {
                return null;
            } else if (name) {
                return name;
            } else {
                return '{...}';
            }
        case 'undefined':
        case 'number':
        case 'boolean':
            return String(value);
        case 'string':
            return `'${value}'`;
    }
};

const getValueColor = value => {
    const type = typeof value;
    if (type === 'number' || type === 'boolean') {
        return '#9980FF';
    }
    if (type === 'string') {
        return '#5CD5FB';
    }
    if (type === 'undefined' || value === null) {
        return '#6F6F6F';
    }
};

const pushString = (result, string, color) => {
    result.push([
        'span',
        color
            ? {
                  style: `color: ${color}`
              }
            : {},
        string
    ]);
};

const stringify = object => {
    const entries = Object.entries(object);
    const name = getSimpleName(object);
    let result = [];

    pushString(result, `${name} `, '#8F8F81');

    pushString(result, '{');
    let first = false;
    for (const [key, value] of entries) {
        if (result.length > 5) {
            pushString(result, ', ...');
            break;
        }

        if (first) {
            pushString(result, ', ');
        }

        pushString(result, key, '#8F8F81');
        pushString(result, ': ');
        pushString(result, valueToString(value), getValueColor(value));
        first = true;
    }
    pushString(result, '}');
    return result;
};

const output = (object, index, key, value, parent) => {
    const result = [
        'div',
        {},
        ['div', {}, `[${index}] ${key}: `, ['object', { object: null, config: object }]]
    ];

    const store = result[2][3][1];

    if (typeof value === 'undefined') {
        const descriptor = Object.getOwnPropertyDescriptor(object, key);

        if (typeof descriptor.get === 'function') {
            store.object = object[key] || parent[key] || null;
        } else {
            result[2][3] = [
                'span',
                { style: `color: ${getValueColor(undefined)}` },
                'undefined'
            ];
        }
    } else {
        store.object = value;
    }

    return result;
};

window.devtoolsFormatters = [
    {
        header: object => {
            const name = getSimpleName(object);

            if (name) {
                return ['div', {}, ...stringify(object)];
            }
        },
        hasBody: object => {
            const name = getSimpleName(object);

            return !!name;
        },
        body: (object, parent) => {
            const result = ['div', {}];
            Object.entries(object).forEach(([key, value], index) => {
                result.push(output(object, index, key, value, parent));
            });

            result.push(output(object, '', 'prototype', object.__proto__));
            return result;
        }
    }
];
