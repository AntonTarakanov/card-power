import { powerUtils } from '../library';

import { DeckOfCards } from '../cardLibrary';

/**
 * Конкретный состав карт в игре и взаимодействие с ними.
 */
export class DeckAPI {
    constructor(config) {
        this.config = this.createConfig(config);

        const deckNames = [];

        for (let i = 0; i < this.config.NUMBER_OF_DECKS; i++) {
            const deckName = this.createDeckName(i);

            this[deckName] = new DeckOfCards();
            deckNames.push(deckName);
        }

        this.deckNames = deckNames;
    }

    createConfig(config = {}) {
        const defaultConfig = {
            LEVEL: 'hard',
            NUMBER_OF_DECKS: 2,
            DECK_NAME: 'deck',
        };

        return {
            ...defaultConfig,
            ...config,
        };
    }

    createDeckName(i) {
        return i !== undefined ? `${this.config.DECK_NAME}_${i}` : this.config.DECK_NAME;
    }

    getAllCard() {
        return this.deckNames.map(name => this[name].getAllCard()).flat();
    }

    getRandomCards() {
        const fullList = this.getAllCard();

        return powerUtils.shuffleList(fullList);
    }
}