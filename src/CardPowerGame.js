import { CardDataAPI } from './data';
import { CardRenderAPI } from './render';

/**
 * Игра CardPower.
 */
export default class CardPowerGameApp {
    constructor(config) {
        const configForDataAPI = {
            NUMBER_CARDS_ON_TABLE: config.NUMBER_CARDS_ON_TABLE,
            NUMBER_COLUMN_ON_TABLE: config.NUMBER_COLUMN_ON_TABLE,
            NUMBER_ROW_ON_TABLE: config.NUMBER_ROW_ON_TABLE,
        };

        this.cardDataAPI = new CardDataAPI(this.dataHandler, configForDataAPI, true);
        this.cardRenderAPI = new CardRenderAPI(this.dataHandler, {}, true);

        const matrix = this.cardDataAPI.getMatrix();

        this.cardRenderAPI.initRender(matrix);
    }

    start() {}

    dataHandler() {}

    domHandler() {}
}