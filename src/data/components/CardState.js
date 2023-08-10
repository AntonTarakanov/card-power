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
        this[FIELDS.COUNTER] = null;
        this[FIELDS.SELECTED_CARD] = null;
    }

    getStage() {
        return this.getStateProperty(FIELDS.STAGE);
    }

    setStage(stage) {
        this.setState(FIELDS.STAGE, stage);
    }

    setSelectedCard(position) {
        this.setState(FIELDS.SELECTED_CARD, position);
    }
}

export const FIELDS = {
    STAGE: 'stage',                 // Этап игры.
    COUNTER: 'counter',             // Счётчки очков.
    SELECTED_CARD: 'selectedCard',  // Координаты выбранной карты.
}

export const STAGES = {
    START: 'start',         // Ожидание выбора карты для хода. Счётчик не активирован.
    SELECTED: 'selected',   // Выбрана карты которая будет перемещена. Подсветка вариантов.
    WAITING: 'start',       // Ожидание выбора карты для хода.
}