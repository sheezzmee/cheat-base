import putConstructorInWindow from '../putConstructorInWindow';
import classesInfo from './classesInfo';

export default () => {
    for (const classInfo of classesInfo) {
        const sourceClassName = classInfo.shift();

        if (!window[sourceClassName]) {
            continue;
        }

        let sourceClass;

        try {
            sourceClass = new window[sourceClassName]();
        } catch (error) {
            console.log(`${sourceClassName} :(`);
            continue;
        }

        if (!sourceClass) {
            continue;
        }

        classInfo.forEach((className, index) => {
            if (!className) {
                return;
            }

            const constructor =
                Object.values(sourceClass)[index]?.__proto__?.constructor;

            if (!constructor?.$metadata$) {
                console.log(`мы проебали ${className} в ${sourceClassName}`);
                return;
            }

            putConstructorInWindow(constructor, className);
        });
    }
};
