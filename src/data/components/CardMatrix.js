import { PioneerMatrix } from '../../library';

import { Tile } from './Tile';

/**
 * Данные в виде матрицы.
 *
 * Заменяем "matrixItem".
 * Функционал добавления строки/элемента при необходимости.
 *
 * TODO: доработать проверку на некорректные координаты.
 */
export class CardMatrix extends PioneerMatrix {
    createMatrixItem(x, y) {
        const result = super.createMatrixItem(x, y);

        return new Tile(result);
    }

    getItem({ x, y }) {
        /*if (!this.checkPositionLimits({ x, y })) {
            console.log(MATRIX_TEXT.POSITION_LIMIT_ERROR);

            return null;
        }*/

        const row = this[y];

        if (!row) {
            this.addAdditionalRow(y);
        } else {
            const tile = this[y][x];

            if (!tile) {

                this.addAdditionalTile(y, x);
            }
        }

        return this[y][x];
    }

    /**
     * Для "CardMatrix" можем выходить за пределы "y".
     * При выходе за пределы "y" - добавляем ряд.
     */
    checkPositionLimits({ x, y }) {
        const isErrorX = !CardMatrix.checkPositionLimitMethod(x, this.MAX_X);
        const isErrorY = !CardMatrix.checkPositionLimitMethod(y, this.MAX_Y);
        let result = true;

        if (isErrorX) {
            result = false;
        }

        /*if (isErrorY) {
            console.log('Необходимо предусмотреть добавление новой строки matrix.');
        }*/

        return result;
    }

    addAdditionalTile(i, j) {
        this[i][j] = this.createMatrixItem(j, i);
    }

    addAdditionalRow(i) {
        this[i] = this.createEmptyMatrixRow(i);
    }
}