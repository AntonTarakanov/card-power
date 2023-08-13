import { PioneerDataHelper } from '../library';

import { DeckAPI } from './components/DeckAPI';
import { HistoryData } from './components/HistoryData';
import { CardMatrix } from './components/CardMatrix';
import { CardState } from './components/CardState';
import { FIELDS as TILE_FIELDS } from './components/Tile';

/**
 * Аккумулирует логику matrix и card.
 *
 * decks - DeckAPI.
 * history - HistoryAPI.
 * matrix - взаимодействие с информацией на экране.
 * state - состояние приложение.
 */
export class CardDataHelper extends PioneerDataHelper {

    matrixChangeHandler(props) {

    }

    initDataState() {
        this.state = new CardState();
    }

    initDataAdditional() {
        this.initDecks();
        this.history = new HistoryData();
    }

    initDecks() {
        this.decks = new DeckAPI(this.config);
    }

    createDataMatrix() {
        return new CardMatrix({
            MAX_X: this.config.MAP_SIZE_X,
            MAX_Y: this.config.MAP_SIZE_Y,
        }, {
            dataHandler: this.matrixChangeHandler.bind(this),
        });
    }

    /**
     * Устанавливаем последовательно значения в matrix.
     */
    initialMatrix() {
        const startCards = this.decks.getStartMatrixPart();
        let i = 0;

        while (i < startCards.length) {
            const cardTile = startCards[i];
            const x = i % this.config.NUMBER_COLUMN_ON_TABLE; // column
            const y = ~~(i / this.config.NUMBER_COLUMN_ON_TABLE); // row

            const matrixTile = this.matrix.getItemWithEmpty({ x, y });

            matrixTile.setValues(cardTile);

            i++
        }
    }

    /**
     * TODO: возможно перерисовки будут вызываться только тут, тогда перенести их сюда.
     */
    setSelectedCard(position, value) {
        this.state.setSelectedCard(value ? position : {});
        this.matrix.changeTile(position, TILE_FIELDS.IS_SELECTED, value);
    }

    getBottomColumnTile(x) {
        const columnList = this.matrix.getColumnList(x);

        return columnList[columnList.length - 1];
    }

    getMovingTile() {
        const position = this.state.getSelectedCard();

        return this.matrix.getItem(position);
    }

    checkAvailableMove(movingTile, targetTile) {
        return targetTile.value === movingTile.value + 1;
    }

    /**
     * bottomTile - этот элемент не меняется.
     *
     * @return {array} изменённые элементы.
     */
    doTransfer(movingTile, bottomTile) {
        const targetPosition = { x: bottomTile.position.x, y: bottomTile.position.y + 1 };
        const changedList = [ { ...movingTile.position }, targetPosition ];

        this.matrix.doTransfer(movingTile, targetPosition);

        this.useHandler(changedList);

        return changedList;
    }
}