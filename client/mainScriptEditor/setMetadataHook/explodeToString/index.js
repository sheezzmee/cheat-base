import { createProperty } from '../../../shared/utils';

export default (name, prototype) => {
    const string = prototype.toString.toString();
    const fields = Array.from(
        string.matchAll(
            /(?:(?:\w+)="\+this\.(?:\w+)\.)|(?:(?:\w+)="\+this\.(?:\w+)\()|(?:(?<name>\w+)="\+(?:\w+?\()?this\.(?<mangledName>\w+)\)?)/g
        )
    ).map(field => field.groups);

    if (!name) {
        name =
            string.match(/return"(\w+)/)?.[1] ||
            string.match(/function\(\)\{var [\w$]+="(\w+) \[/)?.[1];
    }

    const properties = {};
    fields.forEach(field => {
        if (field.name && field.mangledName) {
            properties[field.name] = createProperty(field.mangledName);
        }
    });

    Object.defineProperties(prototype, properties);
    return name;
};
