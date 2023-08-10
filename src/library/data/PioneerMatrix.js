import { PioneerInfo } from '../common';
import { MATRIX_TEXT } from './constants';

/**
 * Самые простые методы для работы с данными в виде матрицы.
 */
export class PioneerMatrix extends Array {
    constructor(config) {
        super();

        const definedConfig = this.createConfig(config);

        this.MAX_X = definedConfig.MAX_X;
        this.MAX_Y = definedConfig.MAX_Y;
    }

    initMatrix() {
        this.fillInMatrix();
    }

    fillInMatrix() {
        const emptyMatrix = this.getEmptyMatrix();

        this.overwriteMatrix(emptyMatrix);
    }

    /**
     * Принимаем матрицу и последовательно записывает её.
     *
     * @param {array} matrix.
     */
    overwriteMatrix(matrix) {
        matrix.forEach((row, index) => {
            this[index] = row;
        });
    }

    /**
     * Получить элемент матрицы.
     *
     * @param {object} position - { x, y } .
     */
    getItem({ x, y }) {
        if (!this.checkPositionLimits({ x, y })) {
            console.log(MATRIX_TEXT.POSITION_LIMIT_ERROR);

            return null;
        }

        return this[y][x];
    }

    /**
     * Меняем одно переданное значение на другое
     *
     * @param {string} property
     * @param {any|array} oldValue
     * @param {any} newValue
     *
     * @return {array} [{ x, y }]. Координаты изменённых элементов.
     */
    changeParamByParam(property, oldValue, newValue) {
        const changedList = [];

        this.forEach(row => {
            row.forEach(item => {
                let isEqual;

                if (Array.isArray(oldValue)) {
                    isEqual = oldValue.some(oldValueItem => oldValueItem === item[property]);
                } else {
                    isEqual = item[property] === oldValue;
                }

                if (isEqual) {
                    item[property] = newValue;

                    changedList.push(item.position);
                }
            });
        });

        return changedList;
    }

    /**
     *
     */
    getEmptyMatrix() {
        const result = [];

        if (!this.MAX_X && !this.MAX_Y) {
            return [[]];
        }

        for (let i = 0; i < this.MAX_Y; i++) {
            result.push(this.createEmptyMatrixRow(i));
        }

        return result;
    }

    createEmptyMatrixRow(i) {
        const rowResult = [];

        for (let j = 0; j < this.MAX_X; j++) {
            rowResult.push(this.createMatrixItem(j, i));
        }

        return rowResult;
    }

    createMatrixItem(x, y) {
        const TILE_FIELDS = { X: 'x', Y: 'y' };
        const tile = new PioneerInfo(TILE_FIELDS, null);

        tile.setValueByEntries([ [TILE_FIELDS.X, x], [TILE_FIELDS.Y, y] ]);

        return tile;
    }

    /**
     * Проверка соответствию границы матрицы.
     */
    checkPositionLimits({ x, y }) {
        const limitsMethod = PioneerMatrix.checkPositionLimitMethod;

        return limitsMethod(x, this.MAX_X) && limitsMethod(y, this.MAX_Y);
    }

    createConfig(config = {}) {
        const defaultConfig = {
            MAX_X: 10,
            MAX_Y: 10,
        };

        return {
            ...defaultConfig,
            ...config,
        };
    }

    changeTileByEntries(position, entriesList) {
        const tile = this.getItem(position);

        tile.setValueByEntries(entriesList);
    }

    changeTile(position, field, value) {
        const tile = this.getItem(position);

        tile.setValue(field, value);
    }

    static checkPositionLimitMethod(value, maxLimit) {
        return value >= 0 && value <= maxLimit
    }
}