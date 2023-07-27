import { DataHelper } from '../library';

import { DeckAPI } from './DeckAPI';

/**
 * Аккумулирует логику matrix и card.
 *
 * TODO: отнаследоваться от DataHelper. Сделать sandbox для DataHelper;
 */
export class CardDataHelper {
    constructor(config, handler) {
        this.config = config;
        this.handler = handler;

        const libraryDataHelperInstance = new DataHelper(this.handler, this.config, true);

        this.appState = {};     // Вся информация по игре.
        this.decks = this.createDecks();
        this.matrix = {};       // то что отображается в базовом поле.
        this.history = {};
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
    initData() {
        const deckApiInstance = new DeckAPI(this.config);

        this.setFullDecks(deckApiInstance);
        const fullRandomList = deckApiInstance.getRandomCards();
        const matrixPart = fullRandomList.slice(0, this.config.NUMBER_CARDS_ON_TABLE);
        const freePart = fullRandomList.slice(this.config.NUMBER_CARDS_ON_TABLE);

        this.setRandomParts(freePart);
    }

    // TODO: вынести в класс.
    createDecks() {
        return {
            fullDecks: {},          // DeckAPI - общая информация об используемых колодах.
            randomParts: {},        // Часть на раздачу.
            completedParts: {},     // Завершённые части.
        }
    }

    setFullDecks(value) {
        this.decks.fullDecks = value;
    }

    setRandomParts(value) {
        this.decks.randomParts = value;
    }
}