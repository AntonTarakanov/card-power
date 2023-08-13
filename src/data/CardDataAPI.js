import { CardDataHelper } from './CardDataHelper';

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
        this.setSelectedCard(position, true);

        this.useHandler(position);
    }

    doSelectColumnForMove(position) {
        const bottomTile = this.getBottomColumnTile(position.x);
        const movingTile = this.getMovingTile();

        const isAvailable = this.checkAvailableMove(movingTile, bottomTile);

        this.setSelectedCard(movingTile.position, false);
        this.state.setStage(STATE_STAGE.WAITING);

        if (isAvailable) {
            this.doTransfer(movingTile, bottomTile);
        }
    }

    // get / set =>

    getMatrix() {
        return this.matrix;
    }

    getStateStage() {
        return this.state.getStage();
    }
}