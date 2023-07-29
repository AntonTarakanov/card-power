import { getDiv, getEmptyDiv } from './utils';

/**
 * Базовые методы для работы с DOM.
 */
export class PioneerRender {
    getElementById(id) {
        return document.getElementById(id);
    }

    getDiv(className, id, text, child) {
        return getDiv(className, id, text, child);
    }

    getEmptyDiv() {
        return getEmptyDiv();
    }
}