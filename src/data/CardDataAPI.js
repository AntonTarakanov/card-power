import { CardDataHelper } from './CardDataHelper';

/**
 * Методы взаимодействия с "CardDataHelper".
 */
export class CardDataAPI extends CardDataHelper {
    constructor(dataHandler, configForDataAPI, isDev) {
        super(dataHandler, configForDataAPI, isDev);

        this.initialMatrix();
    }

    getMatrix() {
        return this.matrix;
    }

    getStateStage() {
        return this.state.getStage();
    }

    setStateStage(stage) {
        this.state.setStage(stage);
    }
}