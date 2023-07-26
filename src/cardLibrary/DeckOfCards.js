import { Card } from './Card';
import { CARD_SUITS, STANDARD_CARDS_INFO, NON_STANDARD_CARDS, NON_STANDARD_CARDS_VALUE } from './constants';

/**
 * Колода карт.
 */
export class DeckOfCards {
    constructor(config) {
        this.config = this.createConfig(config);

        Object.values(CARD_SUITS).forEach(suit => {
            this[suit] = this.createDeck(suit);
        });
    }

    createConfig(config = {}) {
        const defaultConfig = {
            isFullDeck: true,
        }

        return {
            ...defaultConfig,
            ...config,
        }
    }

    createDeck(suit) {
        return {
            cards: this.createCardList(this.config.isFullDeck, suit),
            suit,
        }
    }

    // TODO: добавить работу с "isFullDeck".
    createCardList(isFullDeck, suit) {
        const list = [];

        // STANDARD_CARDS
        for (let i = STANDARD_CARDS_INFO.START_POSITION; i <= STANDARD_CARDS_INFO.END_POSITION; i++) {
            list.push(this.createCard(i.toString(), i, suit));
        }

        // NON_STANDARD_CARDS
        Object.values(NON_STANDARD_CARDS).forEach(name => {
            list.push(this.createCard(name, NON_STANDARD_CARDS_VALUE[name], suit));
        });

        return list;
    }

    createCard(name, value, suit) {
        return new Card(name, value, suit);
    }
}