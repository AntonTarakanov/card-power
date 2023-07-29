import { ConfigHelper, BASE_HANDLER_TYPES } from '../common';
import { PioneerState } from './PioneerState';
import { PioneerMatrix } from './PioneerMatrix';
import { DEFAULT_PLAYER_NAME } from './constants';

/**
 * Универсальные методы для работы с данными.
 * Данные в виде матрицы по переданным размерам.
 *
 * config - размер matrix которую необходимо построить.
 * handler - вызов при изменении полей matrix.
 */
export class PioneerDataHelper {
    constructor(handler, config, isDev = false) {
        this.handler = handler;
        this.config = new ConfigHelper(this.createConfig(config));
        this.isDev = isDev;

        this.initData();
    }

    /**
     * Определение минимально необходимых данных.
     */
    initData() {
        this.initDataState();
        this.initDataMatrix();
        this.initDataAdditional();
    }

    initDataState() {
        this.state = new PioneerState();
    }

    initDataMatrix() {
        this.matrix = this.createDataMatrix();

        this.matrix.initMatrix();
    }

    initDataAdditional() {}

    createDataMatrix() {
        return new PioneerMatrix({
            MAX_X: this.config.MAP_SIZE_X,
            MAX_Y: this.config.MAP_SIZE_Y,
        });
    }

    setState(property, value) {
        this.state.setState(property, value);
    }

    getStateProperty(property) {
        return this.state.getStateProperty(property);
    }

    /**
     * Возвращает имена/ключи игроков самым простым способом.
     */
    getPlayersName() {
        const value = this.getNumberOfPlayers();
        const result = [];

        for (let i = 0; i < value; i++) {
            result.push(DEFAULT_PLAYER_NAME + i);
        }

        return result;
    }

    getNumberOfPlayers() {
        return this.config.COUNT_PLAYER || 1;
    }

    /**
     * Получить элемент матрицы по координатам.
     *
     * @param {object} position - { x, y } .
     */
    getItemByPosition(position) {
        return this.matrix.getItem(position);
    }

    /**
     * Меняем одно переданное значение на другое
     *
     * @param {string} property
     * @param {any|array} oldValue
     * @param {any} newValue
     * @param {boolean} useHandler
     */
    changeParamByParam(property, oldValue, newValue, useHandler = false) {
        const changedList = this.matrix.changeParamByParam(property, oldValue, newValue);

        if (useHandler) {
            changedList.forEach(position => {
                this.useHandler(position);
            });
        }
    }

    /**
     * Событие изменения элемента.
     *
     * @param {object} position - { x, y } .
     */
    useHandler(position) {
        this.useHandlerWithCustom(BASE_HANDLER_TYPES.ELEMENT_CHANGED, position);
    }

    /**
     * Любое событие.
     *
     * @param {string} type
     * @param {any} data
     */
    useHandlerWithCustom(type, data) {
        this.handler(type, data);
    }

    createConfig(config = {}) {
        const defaultConfig = {
            MAP_SIZE_X: 10,
            MAP_SIZE_Y: 10,
        };

        return {
            ...defaultConfig,
            ...config,
        };
    }
}