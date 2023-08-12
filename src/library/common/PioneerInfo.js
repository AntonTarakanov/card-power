const DEFAULT_FILED_VALUE = {};

/**
 * Базовые методы для работы с информацией.
 */
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

    setValueByEntries(entriesList) {
        entriesList.forEach(keyValue => {
            const [key, value] = keyValue;

            this.setValue(key, value);
        });
    }

    overwriteValues(obj) {
        this.setValueByEntries(Object.entries(obj));
    }
}