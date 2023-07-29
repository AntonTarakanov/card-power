import { PioneerRender } from '../../library';

export class PioneerTileCard extends PioneerRender {
    /**
     * Создаёт и возвращает.
     *
     * @param {object} card - suits, name.
     */
    createNode(card) {
        const cardInfo = this.createTileCard(card);
        const emptyWrap = this.getEmptyDiv();

        emptyWrap.append(cardInfo);

        return emptyWrap;
    }

    // Вставляет в
    pastNodeTo(parent, node) {
        parent.append(node);
    }

    // Создаёт, вставляет, сохраняет.
    initNode(parent, card) {
        const node = this.createNode(card);

        this.node = node;

        this.pastNodeTo(parent, node);
    }

    /**
     * @param {object} card - suits, name.
     */
    createTileCard(card) {
        return this.getEmptyDiv();
    }
}