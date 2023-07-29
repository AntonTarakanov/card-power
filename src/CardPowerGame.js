import { CardDataAPI } from './data';

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

        const matrix = this.cardDataAPI.getMatrix();
    }

    start() {}

    dataHandler() {}

    domHandler() {}
}