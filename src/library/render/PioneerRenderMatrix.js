import { PioneerRenderApp } from './PioneerRenderApp';
import { COMMON_CLASS_NAMES, ATTRIBUTE_ORDER, COLORS_CLASS } from './constants';

/**
 * Добавляет к RenderPioneerApp рендер рабочей зоны по переданной matrix.
 */
export class PioneerRenderMatrix extends PioneerRenderApp {
    constructor(handler, config = {}, isDev) {
        super(config.DOM_IDS || {}, isDev);

        this.USE_TABLE = config.USE_TABLE;
        this.handler = handler;
    }

    initRender(matrix) {
        super.initRender();

        this.createMatrix(matrix);
    }

    /**
     * TODO: вынести в отдельный класс.
     *
     * Переопределение заглушки с доп. методами работы с матрицей.
     */
    getAppFieldInstance() {
        const appFieldInstance = super.getAppFieldInstance();

        appFieldInstance.getWrapNode = function() {
            const rootNode = this.getNode();

            return rootNode.firstChild;
        }

        appFieldInstance.getRowNode = function(rowIndex) {
            const wrapNode = this.getWrapNode()

            return wrapNode.childNodes[rowIndex];
        }

        appFieldInstance.getTileNode = function({ x, y }) {
            const rowNode = this.getRowNode(y);

            return rowNode.childNodes[x];
        }

        appFieldInstance.rerenderNode = function() {
            console.log('Не реализовано');
        }

        appFieldInstance.rerenderMatrixTile = function(node, { x, y }) {
            const rootNode = this.getNode();
            const wrapNode = rootNode.firstChild;
            const oldNode = wrapNode.childNodes[y].childNodes[x];

            wrapNode.childNodes[y].replaceChild(node, oldNode);
        }

        return appFieldInstance;
    }

    createMatrix(matrix) {
        if (matrix) {
            const mainNode = this.getAppFieldNode();
            const matrixMap = this.buildDivMatrixNode(matrix);

            mainNode.appendChild(matrixMap);
        }
    }

    /**
     * Устанавливаем атрибуты для клетки.
     *
     * @param {object} tileElement - DOM-элемент клетки.
     * @param {object} attribute - атрибуты.
     * @param {string} prefix -
     */
    setAttributeInTile(tileElement, attribute, prefix) {
        for (let key in attribute) {
            if (attribute.hasOwnProperty(key)) {
                const currentValue = attribute[key];

                if (typeof currentValue === 'object' && currentValue !== null) {
                    this.setAttributeInTile(tileElement, currentValue, key);
                } else {
                    tileElement.setAttribute(`data-${prefix ? prefix + '-' : ''}${key}`, attribute[key]);
                }
            }
        }
    }

    /**
     * Создаём карту в виде DIV-таблицы для приложения.
     *
     * @param {array} matrix
     */
    buildDivMatrixNode(matrix) {
        const wrapElement = this.getDiv();

        wrapElement.className = COMMON_CLASS_NAMES.FLEX_COLUMN;

        matrix.forEach((row, index) => {
            const rowElement = this.buildRowNode(row, index);

            wrapElement.appendChild(rowElement);
        });

        return wrapElement;
    }

    buildRowNode(row, index) {
        const rowElement = this.getDiv();

        rowElement.setAttribute(ATTRIBUTE_ORDER, index);
        rowElement.className = COMMON_CLASS_NAMES.FLEX;

        row.forEach(item => rowElement.appendChild(this.buildWrapTileNode(item)));

        return rowElement;
    }

    buildWrapTileNode(item) {
        const tileWrap = this.buildDivTileNode(item);

        tileWrap.className = `${COMMON_CLASS_NAMES.TILE} ${COLORS_CLASS.WHEAT}`;

        return tileWrap;
    }

    buildDivTileNode(item) {
        const onClickHandler = this.handler;
        const tileHandler = function(event) {
            return onClickHandler(event, this);
        }
        const node = this.getDiv();

        node.addEventListener('click', tileHandler);
        node.textContent = Object.values(item).join('-');

        this.setAttributeInTile(node, item);

        return node;
    }

    /**
     * Создаём карту в виде таблицы(<table>) для приложения.
     *
     * @param {array} matrix
     */
    buildTableMatrixNode(matrix) {
        const tableElement = document.createElement('table');

        matrix.forEach((rowList, index) => {
            const rowElement = this.buildTableRowNode(rowList, index);

            tableElement.appendChild(rowElement);
        });

        return tableElement;
    }

    buildTableRowNode(rowList, index) {
        const rowElement = document.createElement('tr');
        rowElement.setAttribute(ATTRIBUTE_ORDER, index);

        rowList.forEach(item => {
            const cellElement = this.buildTableTileNode(item);

            rowElement.appendChild(cellElement);
        });

        return rowElement;
    }

    buildTableTileNode(item) {
        const onClickHandler = this.handler;
        const tdHandler = function(event) {
            return onClickHandler(event, this);
        }
        const cellElement = document.createElement('td');
        const content = this.buildTableTileContentNode();

        cellElement.appendChild(content);
        cellElement.addEventListener('click', tdHandler);
        this.setAttributeInTile(cellElement, item);

        return cellElement;
    }

    buildTableTileContentNode() {
        return this.getDiv();
    }

    /**
     * @param {array} changedList - tile position
     */
    rerenderTileList(changedList) {
        changedList.forEach(data => {
            this.rerenderTile(data);
        });
    }

    rerenderTile({ tile, position }) {
        const node = this.buildWrapTileNode(tile);

        this.appFieldInstance.rerenderMatrixTile(node, position);
    }

    static getPositionFromNode(node) {
        if (!node?.dataset) {
            return null;
        }

        const attrDataset = node.dataset;

        return {
            x: Number(attrDataset.positionX),
            y: Number(attrDataset.positionY),
        };
    }
}