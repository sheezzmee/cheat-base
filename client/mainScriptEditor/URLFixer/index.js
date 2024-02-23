import { modifications } from '..';

// сори за ебланство но import вызывается раньше чем export))
requestAnimationFrame(() => {
    modifications.push(code => {
        code = code.replaceAll('"/play/"', `"/cors/${location.source}/"`);
        code = code.replaceAll(
            '"/browser-public/"',
            `"/cors/${location.source.replace('index.html', '')}"`
        );

        return code.replaceAll('new Image;', 'new Image;e.crossOrigin = "";');
    });
});
