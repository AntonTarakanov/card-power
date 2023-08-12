import { PioneerMatrix } from '../../library';

import { Tile } from './Tile';

/**
 * Данные в виде матрицы.
 *
 * Заменяем "matrixItem".
 * Функционал добавления строки/элемента при необходимости.
 */
export class CardMatrix extends PioneerMatrix {
    createMatrixItem(x, y) {
        return new Tile({ x, y });
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

            emptyList.forEach(position => {
                this.addAdditionalTile(position.y, position.x);
            });
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

    addAdditionalTile(i, j, tile = null) {
        this[i][j] = tile || this.createMatrixItem(j, i);
    }

    addAdditionalRow(i, row = null) {
        this[i] = row || this.createEmptyMatrixRow(i);
    }

    /**
     * Перемещение одного элемента.
     */
    doTransfer(movingTile, targetPosition) {
        const targetTile = this.getItemWithEmpty(targetPosition);

        targetTile.overwriteValues(movingTile);
        movingTile.clearValues();
    }

    pastTileByPosition(tile, newPosition) {
        this.getItemWithEmpty();
    }

    /*removeTileByPosition(position) {
        this[y][x] = null;
    }*/
}