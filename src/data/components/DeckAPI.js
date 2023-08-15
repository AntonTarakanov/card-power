import { PioneerInfo, powerUtils } from '../../library';

import { DeckOfCards } from '../../cardLibrary';
import { NON_STANDARD_CARDS } from '../../cardLibrary/constants';

/**
 * Конкретный состав карт в игре и взаимодействие с ними.
 */
export class DeckAPI extends PioneerInfo {
    constructor(config) {
        super(FIELDS);
        const deckNames = [];
        this.config = this.createConfig(config);

        for (let i = 0; i < this.config.NUMBER_OF_DECKS; i++) {
            const deckName = this.createDeckName(i);

            this[deckName] = new DeckOfCards({
                customNonStandardCardsValue: {
                    [NON_STANDARD_CARDS.ACE]: 1,
                }
            });
            deckNames.push(deckName);
        }

        this.deckNames = deckNames;

        this.initParts();
    }

    /**
     * Метод распределяет рандомным образом карты по:
     *   "matrixPart" - будет выложено на стол на старте игры. Изменяется с течением игры.
     *   "freePart" - будет использоваться при необходимости раздачи. Добавляется в matrix при необходимости.
     *
     *   "matrix" - 10 колонок (x/y). Карты располагаются последовательно слева направо.
     *   Для 54 карты это - 4 колонки по 6 карт, 6 колонок по 5 карт.
     *
     *   8 столбцов "completed" в конце игры.
     *   5 раз по 10 карт на раздачу из "freePart".
     */
    initParts() {
        const fullRandomList = this.getRandomCards();

        const matrixPart = fullRandomList.slice(0, this.config.NUMBER_CARDS_ON_TABLE);
        const freePart = fullRandomList.slice(this.config.NUMBER_CARDS_ON_TABLE);

        this.setStartMatrixPart(matrixPart);
        this.setRandomParts(freePart);
    }

    createConfig(config = {}) {
        const defaultConfig = {
            LEVEL: 'hard',
            NUMBER_OF_DECKS: 2,
            DECK_NAME: 'deck',
        };

        return {
            ...defaultConfig,
            ...config,
        };
    }

    createDeckName(i) {
        return i !== undefined ? `${this.config.DECK_NAME}_${i}` : this.config.DECK_NAME;
    }

    getAllCard() {
        return this.deckNames.map(name => this[name].getAllCard()).flat();
    }

    getRandomCards() {
        const fullList = this.getAllCard();

        return powerUtils.shuffleList(fullList);
    }

    setRandomParts(value) {
        this.setValue(FIELDS.RANDOM_PARTS, value);
    }

    setStartMatrixPart(value) {
        this.setValue(FIELDS.START_MATRIX_PART, value);
    }

    getStartMatrixPart() {
        return this.getValue(FIELDS.START_MATRIX_PART);
    }
}

const FIELDS = {
    RANDOM_PARTS: 'randomParts',            // Часть на раздачу.
    COMPLETED_PARTS: 'completedParts',      // Завершённые части.
    START_MATRIX_PART: 'startMatrixPart',   // Старт игры.
}