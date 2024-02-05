import { getSimpleName } from './cheatBase/utils';

const colors = {
    number: 'hsl(252deg 100% 75%)',
    string: 'var(--sys-color-token-property-special)',
    null: 'var(--sys-color-state-disabled)',
    prototype: 'var(--sys-color-token-subtle)',
    member: 'var(--sys-color-token-tag)'
};

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
        return colors.number;
    }
    if (type === 'string') {
        return colors.string;
    }
    if (type === 'undefined' || value === null) {
        return colors.null;
    }
};

const span = (string, color) => {
    return [
        'span',
        color
            ? {
                  style: `color: ${color};`
              }
            : {},
        string
    ];
};

const stringify = object => {
    let comma = false;
    const entries = Object.entries(object);
    const name = getSimpleName(object);
    const elements = [];

    elements.push(span(`${name} `, colors.null));
    elements.push(span('{'));

    for (const [key, value] of entries) {
        if (elements.length > 5) {
            elements.push(span(', ...'));
            break;
        }

        if (comma) {
            elements.push(span(', '));
        }

        elements.push(span(key, colors.null));
        elements.push(span(': '));
        elements.push(span(valueToString(value), getValueColor(value)));

        comma = true;
    }

    elements.push(span('}'));

    return elements;
};

const output = (object, index, key, value, parent, prototype = false) => {
    const result = [
        'div',
        {},
        [
            'div',
            {},
            [
                'span',
                {
                    style: `font-weight: bold; color: ${colors.prototype};`
                },
                index !== null ? `[${index}] ` : ''
            ],
            [
                'span',
                {
                    style: `${prototype ? '' : 'font-weight: bold; '}color: ${
                        prototype ? colors.prototype : colors.member
                    }; flex-shrink: 0;`
                },
                `${key}`
            ],
            ['span', {}, ': '],
            ['object', { object: null, config: object }]
        ]
    ];

    const store = result[2].at(-1)[1];

    if (typeof value === 'undefined') {
        const descriptor = Object.getOwnPropertyDescriptor(object, key);

        if (typeof descriptor.get === 'function') {
            store.object = object[key] || parent[key] || null;
        } else {
            result[2][3] = [
                'span',
                {
                    style: `color: ${colors.null};`
                },
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
                return ['span', {}, ...stringify(object)];
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

            result.push(
                output(
                    object,
                    null,
                    '[[Prototype]]',
                    object.__proto__,
                    null,
                    true
                )
            );
            return result;
        }
    }
];
