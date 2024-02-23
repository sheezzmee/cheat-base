import { modifications } from '..';

// сори за ебланство но import вызывается раньше чем export))
requestAnimationFrame(() => {
    modifications.push(code => {
        return code.replaceAll(
            '"entrance_hash_key"',
            `"${location.pathname}_entrance_hash_key"`
        );
    });
});
