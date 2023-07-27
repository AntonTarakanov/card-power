/**
 * Самые простые методы для работы с состоянием приложения или его отдельных частей.
 */
export class PioneerState {
    setState(property, value) {
        if (property) {
            this[property] = value;
        }
    }

    getStateProperty(property) {
        return this[property];
    }
}