import { PioneerDataHelper } from '../library';

import { DeckAPI } from './components/DeckAPI';
import { HistoryData } from './components/HistoryData';
import { CardMatrix } from './components/CardMatrix';
import { CardState } from './components/CardState';
import { FIELDS as TILE_FIELDS } from './components/Tile';

import { CARD_HANDLER_TYPES } from '../constants';

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

            i++;
        }
    }

    setSelectedCard(position, value) {
        this.state.setSelectedCard(value ? position : {});
        this.matrix.changeTile(position, TILE_FIELDS.IS_SELECTED, value);
    }

    getBottomColumnTile(x) {
        const columnList = this.matrix.getColumnList(x);

        return columnList.findLast(tile => tile.value);
    }

    getMovingTile() {
        const position = this.state.getSelectedCard();

        return this.matrix.getItem(position);
    }

    /**
     * Проверка на то что карта может выбрана для перемещения.
     */
    checkAvailableSelect({ x, y }) {
        const columnList = this.matrix.getColumnList(x);
        const selectColumn = columnList.slice(y - 1);

        return true;
    }

    /**
     * Проверка на то что ход может быть совершён для выбранных карт.
     */
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

        this.matrix.doTransfer(movingTile, targetPosition);

        // TODO: переработать полностью эти перерисовки.
        this.useHandlerWithCustom(CARD_HANDLER_TYPES.BEFORE_DO_TRANSFER);
        this.useHandler(movingTile.position);
        this.useHandler(targetPosition);
    }

    doCancelSelection(tile) {
        this.useHandler(tile.position);
    }
}