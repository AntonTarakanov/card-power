import { Card } from '../../cardLibrary';


export class Tile extends Card {
    constructor(position) {
        super();

        this.initTileInfo(position);
    }

    initTileInfo(position) {
        this[FIELDS.IS_SHOW] = false;
        this[FIELDS.POSITION] = { ...position };
        this[FIELDS.IS_SELECTED] = false;
    }

    /**
     * @param {object} keyValueObj
     */
    setValues(keyValueObj) {
        Object.keys(keyValueObj).forEach(key => {
            if (key !== FIELDS.POSITION) {
                this.setValue(key, keyValueObj[key]);
            }
        });
    }

    setValueByEntries(entriesList) {
        entriesList.forEach(keyValue => {
            const [key, value] = keyValue;

            if (!this.checkImmutableField(key)) {
                this.setValue(key, value);
            }
        });
    }

    clearValues() {
        Object.keys(this).forEach(key => {
            if (!this.checkImmutableField(key)) {
                this.setValue(key, null);
            }
        });
    }

    checkImmutableField(field) {
        return IMMUTABLE_FIELDS.includes(field);
    }
}

export const FIELDS = {
    IS_SHOW: 'isShow',
    POSITION: 'position',
    IS_SELECTED: 'isSelected',
}

export const IMMUTABLE_FIELDS = [FIELDS.POSITION];