export class ConfigHelper {
    constructor(config) {
        for (let key in config) {
            this[key] = config[key];
        }
    }

    getValue(field) {
        return this[field];
    }

    setValue(field, value) {
        this[field] = value;
    }
}