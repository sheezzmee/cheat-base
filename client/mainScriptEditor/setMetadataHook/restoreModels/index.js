import models from './models';
import { prototypeHook, find, getSimpleName } from '../../../shared/utils';
import putConstructorInWindow from '../putConstructorInWindow';

export default (constructor, name) => {
    if (name === 'ModelsRegistryImpl') {
        prototypeHook(constructor, 'i:5', function () {
            prototypeHook(constructor, 'i:5', () => {});
            window.models = this;
            const arrayModels = find(this, 'i:0.i:1')[1];

            setTimeout(() => {
                arrayModels.forEach(model => {
                    const id = find(model, 'i:5')[1].toString();
                    const name = models[id];

                    if (!name) {
                        return;
                    }

                    putConstructorInWindow(model.__proto__.constructor, name);
                    putConstructorInWindow(
                        model.__proto__.__proto__.constructor,
                        `${name}Base`
                    );

                    Object.values(model).forEach(property => {
                        const __this__ = property;
                        if (property) {
                            Object.values(property).forEach(property => {
                                if (getSimpleName(property) === name) {
                                    putConstructorInWindow(
                                        __this__.__proto__.constructor,
                                        `${name}Server`
                                    );
                                }
                            });
                        }
                    });
                });
            }, 1000);
        });
    }
};
