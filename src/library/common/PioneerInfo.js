const DEFAULT_FILED_VALUE = {};

export class PioneerInfo {
    constructor(fields, defaultValue) {
        this.initFields(fields, defaultValue);
    }

    initFields(fields = {}, defaultValue = DEFAULT_FILED_VALUE) {
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