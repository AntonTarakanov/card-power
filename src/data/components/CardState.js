import { PioneerState } from '../../library';

/**
 *
 */
export class CardState extends PioneerState {
    constructor() {
        super();

        this.initStateInfo();
    }

    initStateInfo() {
        this[FIELDS.STAGE] = null;
    }

    getStage() {
        return this.getStateProperty(FIELDS.STAGE);
    }

    setStage(stage) {
        this.setState(FIELDS.STAGE, stage);
    }
}

export const FIELDS = {
    STAGE: 'stage',         // Этап игры.
    COUNTER: 'counter',     // Счётчки очков.
}

export const STAGES = {
    START: 'start',         // Ожидание выбора карты для хода. Счётчик не активирован.
    SELECTED: 'selected',   // Выбрана карты которая будет перемещена. Подсветка вариантов.
    WAITING: 'start',       // Ожидание выбора карты для хода.
}