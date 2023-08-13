import { CardDataAPI, STATE_STAGE } from './data';
import { CardRenderAPI } from './render';
import { BASE_HANDLER_TYPES } from './library';

/**
 * Игра CardPower.
 *
 * "do..." - игровое действие.
 */
export class CardPowerGameApp {
    constructor(config) {
        const configForDataAPI = {
            NUMBER_CARDS_ON_TABLE: config.NUMBER_CARDS_ON_TABLE,
            NUMBER_COLUMN_ON_TABLE: config.NUMBER_COLUMN_ON_TABLE,
            NUMBER_ROW_ON_TABLE: config.NUMBER_ROW_ON_TABLE,
            MAP_SIZE_X: config.matrixSize.x,
            MAP_SIZE_Y: config.matrixSize.y,
        };

        this.cardDataAPI = new CardDataAPI(this.dataHandler.bind(this), configForDataAPI, true);
        this.cardRenderAPI = new CardRenderAPI(this.domHandler.bind(this), {}, true);

        const matrix = this.cardDataAPI.getMatrix();

        this.cardRenderAPI.initRender(matrix);
    }

    /**
     * TODO: Переписать на универсальный метод после изменения library.
     */
    dataHandler(type, data) {
        if (type === BASE_HANDLER_TYPES.ELEMENT_CHANGED) {
            this.cardRenderAPI.rerenderTile(data);
        }

        if (type === BASE_HANDLER_TYPES.ELEMENTS_CHANGED) {
            console.log('data', data);

            this.cardRenderAPI.rerenderTileList(data);
        }
    }

    /**
     * TODO: переименовать в matrix.
     *
     * Обработка событий с matrix элементов.
     */
    domHandler(event, target) {
        const position = CardRenderAPI.getPositionFromNode(target);
        const stage = this.getStateStage();

        // Выбор карты для начала хода + старт таймера/счёта.
        if (stage === STATE_STAGE.START) {
            this.doFirstSelectCard(position);
        }

        // Выбор карты для завершения хода.
        if (stage === STATE_STAGE.SELECTED) {
            this.doSelectColumnForMove(position);
        }

        // Выбор карты для начала хода.
        if (stage === STATE_STAGE.WAITING) {
            this.doSelectCard(position);
        }
    }

    /**
     * Предварительная раздача карт.
     */
    doStart() {
        this.cardDataAPI.doStart();
    }

    /**
     * Первый клик в игре. Выбор карты, включение таймера, начало счёта.
     */
    doFirstSelectCard(position) {
        this.doSelectCard(position);
    }

    /**
     * Выбор карты для хода.
     * Смена state, tile.
     */
    doSelectCard(position) {
        this.cardDataAPI.doSelectCard(position);
    }

    /**
     * Клик по элементу при выборе места куда переместить карту.
     * Проверка корректности и совершить ход/сброс.
     */
    doSelectColumnForMove(position) {
        this.cardDataAPI.doSelectColumnForMove(position);
    }


    getStateStage() {
        return this.cardDataAPI.getStateStage();
    }
}