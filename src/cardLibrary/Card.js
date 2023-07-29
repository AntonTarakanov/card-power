import { PioneerInfo } from '../library';

/**
 * Базовый компонент карты.
 */
export class Card extends PioneerInfo {
    constructor(props) {
        super(FIELDS, null);

        if (props && typeof props === 'object') {
            Object.keys(props).forEach(key => {
                this[key] = props[key];
            });
        }
    }
}

const FIELDS = {
    NAME: 'name',
    VALUE: 'value',
    SUIT: 'suit',
}