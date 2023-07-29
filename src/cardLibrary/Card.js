import { PioneerInfo } from '../library';

/**
 * Базовый компонент карты.
 */
export class Card extends PioneerInfo {
    constructor() {
        super(FIELDS, null);
    }
}

const FIELDS = {
    NAME: 'name',
    VALUE: 'value',
    SUITS: 'suits',
}