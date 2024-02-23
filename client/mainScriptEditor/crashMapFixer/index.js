import { modifications } from '..';

// сори за ебланство но import вызывается раньше чем export))
requestAnimationFrame(() => {
    modifications.push(code => {
        return code.replace(
            /(?<begin>\(\)\)(?<clearBuffer>\w+\.\w+\(\),\w+\.\w+\(\));else try\{var (?<objectId>\w)\=\w\.\w+\.\w+\(\),(?<methodId>\w)\=\w\.\w+\.\w+\(\),\w\=this\.\w+\(\w\);.+?catch\((?<exceptionArg>\w+)\){)(?<catchBody>.+?)(?<end>}finally)/,
            '$<begin>$<clearBuffer>;$<end>'
        );
    });
});
