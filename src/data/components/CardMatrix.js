import { PioneerMatrix } from '../../library';

import { Tile } from './Tile';
import { CARD_HANDLER_TYPES } from '../../constants';

/**
 * Данные в виде матрицы.
 *
 * Заменяем "matrixItem".
 * Функционал добавления строки/элемента при необходимости.
 */
export class CardMatrix extends PioneerMatrix {
    constructor(pioneerConfig, cardConfig) {
        super(pioneerConfig);

        this.dataHandler = cardConfig.dataHandler;
    }


    createMatrixItem(position) {
        return new Tile(position);
    }

    /**
     * Если нет элемента - он будет создан.
     *
     * TODO: доработать проверку на некорректные координаты.
     */
    getItemWithEmpty(position) {
        this.createRowIfEmpty(position.y);
        this.createTileIfEmpty(position);

        return this.getItem(position);
    }

    createRowIfEmpty(positionY) {
        const row = this[positionY];

        if (!row) {
            const emptyList = [];

            // Досоздать заглушки, если необходимо.
            for (let i = 0; i <= positionY; i++) {
                if (!this[i]) {
                    emptyList.push(i);
                }
            }

            emptyList.forEach(emptyPositionY => {
                this.addAdditionalRow(emptyPositionY);
            });
        }
    }

    createTileIfEmpty({ x, y }) {
        const tile = this[y][x];

        if (!tile) {
            const emptyList = [];

            // Досоздать заглушки, если необходимо.
            for (let i = 0; i <= x; i++) {
                if (!this[y][i]) {
                    emptyList.push({ x: i, y });
                }
            }

            emptyList.forEach(position => this.addAdditionalTile(position));
        }
    }

    /**
     * Для "CardMatrix" можем выходить за пределы "y".
     * При выходе за пределы "y" - добавляем ряд.
     */
    checkPositionLimits({ x, y }) {
        const isErrorX = !CardMatrix.checkPositionLimitMethod(x, this.MAX_X);
        const isErrorY = !CardMatrix.checkPositionLimitMethod(y, this.MAX_Y);
        let result = true;

        /*if (isErrorX) {
            result = false;
        }*/

        /*if (isErrorY) {
            console.log('Необходимо предусмотреть добавление новой строки matrix.');
        }*/

        return result;
    }

    /**
     * @param {object} position x/y.
     * @param {object} options - tile, rerender.
     */
    addAdditionalTile({ x, y }, options = {}) {
        this[y][x] = options.tile || this.createMatrixItem({ x, y });

        if (options.rerender) {
            this.dataHandler({
                type: CARD_HANDLER_TYPES.MATRIX_TILE_CHANGE,
                tile: this[y][x],
            });
        }
    }

    /**
     * @param {number} i
     * @param {object} options - row, rerender.
     */
    addAdditionalRow(i, options = {}) {
        this[i] = options.row || this.createEmptyMatrixRow(i);

        if (options.rerender) {
            this.dataHandler({
                type: CARD_HANDLER_TYPES.MATRIX_ROW_CHANGE,
                row: this[i],
            });
        }
    }

    /**
     * Перемещение одного элемента.
     */
    doTransfer(movingTile, targetPosition) {
        const targetTile = this.getItemWithEmpty(targetPosition);

        targetTile.overwriteValues(movingTile);
        movingTile.clearValues();
    }

    /*pastTileByPosition(tile, newPosition) {
        this.getItemWithEmpty();
    }*/

    /*removeTileByPosition(position) {
        this[y][x] = null;
    }*/
}