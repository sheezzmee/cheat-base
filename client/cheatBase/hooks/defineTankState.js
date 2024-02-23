import { createProperty } from '../../shared/utils';

const getMangledName = index => {
    const [, name] = Object.entries(TankState.prototype)[index][1]
        .toString()
        .match(
            /function\(\)\{var [\w$]+=this\.([\w$]+);if\(null!=[\w$]+\)return [\w$]+;[\w$]+\("(\w+)"\)\}/
        );
    return name;
};

export default () => {
    Object.defineProperties(TankState.prototype, {
        angularVelocity: createProperty(getMangledName(0)),
        linearVelocity: createProperty(getMangledName(1)),
        orientation: createProperty(getMangledName(2)),
        position: createProperty(getMangledName(3))
    });
};
