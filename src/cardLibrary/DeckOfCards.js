import { Card } from './Card';
import { CARD_SUITS, STANDARD_CARDS_INFO, NON_STANDARD_CARDS, DEFAULT_NON_STANDARD_CARDS_VALUE } from './constants';

/**
 * Колода карт.
 */
export class DeckOfCards {
    constructor(config) {
        this.config = this.createConfig(config);

        const names = [];

        Object.values(CARD_SUITS).forEach(suit => {
            this[suit] = this.createDeck(suit);
            names.push(suit);
        });

        this.names = names;
    }

    createConfig(config = {}) {
        const defaultConfig = {
            isFullDeck: true,
            customNonStandardCardsValue: {},
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
        const nonStandardCardsValue = this.getNonStandardCardsValue();
        const list = [];

        // STANDARD_CARDS
        for (let i = STANDARD_CARDS_INFO.START_POSITION; i <= STANDARD_CARDS_INFO.END_POSITION; i++) {
            list.push(this.createCard(i.toString(), i, suit));
        }

        // NON_STANDARD_CARDS
        Object.values(NON_STANDARD_CARDS).forEach(name => {
            list.push(this.createCard(name, nonStandardCardsValue[name], suit));
        });

        return list;
    }

    createCard(name, value, suit) {
        return new Card({ name, value, suit });
    }

    getAllCard() {
        return this.names.map(name => this.getAllSuitsCard(name)).flat();
    }

    getAllSuitsCard(suit) {
        return this[suit].cards;
    }

    getNonStandardCardsValue() {
        return {
            ...DEFAULT_NON_STANDARD_CARDS_VALUE,
            ...this.config.customNonStandardCardsValue,
        };
    }
}