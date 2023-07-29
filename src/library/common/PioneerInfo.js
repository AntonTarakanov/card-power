export class PioneerInfo {
    constructor(fields, defaultValue) {
        this.initFields(fields, defaultValue);
    }

    initFields(fields = {}, defaultValue = {}) {
        Object.values(fields).forEach(field => {
            this[field] = defaultValue;
        });
    }

    getValue(field) {
        return this[field];
    }

    setValue(field, value) {
        this[field] = value;
    }
}