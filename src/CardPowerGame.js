import { CardDataAPI, STATE_STAGE } from './data';
import { CardRenderAPI } from './render';

/**
 * Игра CardPower.
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

    start() {}

    dataHandler() {}

    domHandler() {}
}