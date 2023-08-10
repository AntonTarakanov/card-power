import { CardDataHelper } from './CardDataHelper';

import { FIELDS as TILE_FIELDS } from './components/Tile';
import { STAGES as STATE_STAGE } from './components/CardState';

/**
 * Методы взаимодействия с "CardDataHelper".
 */
export class CardDataAPI extends CardDataHelper {
    constructor(dataHandler, configForDataAPI, isDev) {
        super(dataHandler, configForDataAPI, isDev);

        this.initialMatrix();
    }

    /**
     * TODO: переместить сюда логику предварительной раздачи карт.
     */
    doStart() {
        this.state.setStage(STATE_STAGE.START);
    }

    doSelectCard(position) {
        this.state.setStage(STATE_STAGE.SELECTED);
        this.state.setSelectedCard(position);
        this.matrix.changeTile(position, TILE_FIELDS.IS_SELECTED, true);

        this.useHandler(position);
    }


    getMatrix() {
        return this.matrix;
    }

    getStateStage() {
        return this.state.getStage();
    }
}