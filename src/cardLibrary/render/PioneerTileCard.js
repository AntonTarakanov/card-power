import { PioneerRender } from '../../library';
import { CARD_SUITS } from '../constants';
import { COLORS_CLASS } from './constants';

/**
 *
 */
export class PioneerTileCard extends PioneerRender {
    /**
     * Создаёт и возвращает.
     *
     * @param {object} card - suits, name.
     */
    createNode(card) {
        const emptyWrap = this.getEmptyDiv();
        const cardInfo = this.createTileCard(card);

        emptyWrap.append(cardInfo);

        return emptyWrap;
    }

    // Вставляет в
    pastNodeTo(parent, node) {
        parent.append(node);
    }

    // Создаёт, вставляет, сохраняет.
    initNode(parent, card, viewType = '') {
        const node = this.createNode(card);

        this.node = node;

        this.pastNodeTo(parent, node);
    }

    /**
     * @param {object} card - suits, name.
     */
    createTileCard({ suit, name }) {
        const tileCardNode = this.getEmptyDiv();

        tileCardNode.className = PioneerTileCard.getColorClassBySuit(suit);
        tileCardNode.textContent = PioneerTileCard.getIconBySuit(suit) + ' ' + name;

        return tileCardNode;
    }

    static getColorClassBySuit(suit) {
        switch (suit) {
            case CARD_SUITS.CLUBS: return COLORS_CLASS.CLUBS;
            case CARD_SUITS.DIAMONDS: return COLORS_CLASS.DIAMONDS;
            case CARD_SUITS.HEARTS: return COLORS_CLASS.HEARTS;
            case CARD_SUITS.SPADES: return COLORS_CLASS.SPADES;
            default: return '';
        }
    }

    static getIconBySuit(suit) {
        switch (suit) {
            case CARD_SUITS.CLUBS: return '♣';
            case CARD_SUITS.DIAMONDS: return '♦';
            case CARD_SUITS.HEARTS: return '♥';
            case CARD_SUITS.SPADES: return '♠';
            default: return '';
        }
    }
}