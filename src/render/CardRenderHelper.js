import { PioneerRenderMatrix } from '../library';

import { TileRender } from './components/Tile';

export class CardRenderHelper extends PioneerRenderMatrix {
    buildDivTileNode(item) {
        const libNode = super.buildDivTileNode(item);
        const newTextContent = libNode.textContent.split('-').slice(0, 3).join('-');

        libNode.textContent = `${newTextContent}`;

        if (newTextContent === '--') {
            libNode.textContent = '';
        }

        const cardTile = new TileRender();

        return libNode;
    }
}