window.classes = [];

export default (constructor, name) => {
    if (!name) {
        return;
    }

    classes.push(name);
    constructor.$metadata$.simpleName = name;

    if (!window[name]) {
        window[name] = constructor;
        return;
    }

    if (window[name] && window[name] === constructor) {
        return;
    }

    if (window[name] && window[name] !== constructor) {
        for (let i = 0; ; i++) {
            const nameWithIndex = `${name}_${i}`;
            if (
                window[nameWithIndex] &&
                window[nameWithIndex] === constructor
            ) {
                return;
            }

            if (!window[nameWithIndex]) {
                window[nameWithIndex] = constructor;
                return;
            }
        }
    }
};
