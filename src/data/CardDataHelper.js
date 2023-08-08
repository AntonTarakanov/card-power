import { PioneerDataHelper } from '../library';

import { DeckAPI } from './components/DeckAPI';
import { HistoryData } from './components/HistoryData';
import { CardMatrix } from './components/CardMatrix';
import { CardState } from './components/CardState';

/**
 * Аккумулирует логику matrix и card.
 *
 * decks - DeckAPI.
 * history - HistoryAPI.
 * matrix - взаимодействие с информацией на экране.
 * state - состояние приложение.
 */
export class CardDataHelper extends PioneerDataHelper {

    initDataState() {
        this.state = new CardState();
    }

    initDataAdditional() {
        this.initDecks();
        this.history = new HistoryData();
    }

    initDecks() {
        this.decks = new DeckAPI(this.config);
    }

    createDataMatrix() {
        return new CardMatrix({
            MAX_X: this.config.MAP_SIZE_X,
            MAX_Y: this.config.MAP_SIZE_Y,
        });
    }

    /**
     * Устанавливаем последовательно значения в matrix.
     */
    initialMatrix() {
        const startCards = this.decks.getStartMatrixPart();
        let i = 0;

        while (i < startCards.length) {
            const cardTile = startCards[i];
            const x = i % this.config.NUMBER_COLUMN_ON_TABLE; // column
            const y = ~~(i / this.config.NUMBER_COLUMN_ON_TABLE); // row

            const matrixTile = this.matrix.getItem({ x, y });

            matrixTile.setValues(cardTile);

            i++
        }
    }
}