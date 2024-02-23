import { getNamedClasses, getSimpleName } from "../../../shared/utils";

export default prototype => {
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
