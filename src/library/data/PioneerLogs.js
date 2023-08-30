/**
 * Логи с форматом { type: string; info: string | object }[];
 * Возможность фильтрации по type.
 */
export class PioneerLogs extends Array {
    constructor(props, options = {}) {
        super(props);

        this[LOGS_FILED.MAX_ITEM] = options.maxItem ? options.maxItem : DEFAULT_VALUES[LOGS_FILED.MAX_ITEM];
    }


    createRecord(type, value) {
        this.push({ type, value });

        if (this.length > this[LOGS_FILED.MAX_ITEM]) {
            this.shift();
        }
    }

    removeRecord() {

    }

    filterRecords(type) {

    }

    clean() {
        this.length = 0;
    }

    static TYPES = {
        CUSTOM_EVENT: 'customEvent',
        DOM_EVENT: 'domEvent',
    };
}

const LOGS_FILED = {
    MAX_ITEM: 'MAX_ITEM',
}

const DEFAULT_VALUES = {
    [LOGS_FILED.MAX_ITEM]: 30,
}