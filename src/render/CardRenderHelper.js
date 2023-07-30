import { PioneerRenderMatrix } from '../library';
import { CARD_VIEW_TYPE } from '../cardLibrary/render/constants';

import { TileRender } from './components/Tile';

export class CardRenderHelper extends PioneerRenderMatrix {
    buildWrapTileNode(row, index) {
        const result = super.buildWrapTileNode(row, index);

        result.className = 'cardLib_tile_wrapCut color_wheat';

        return result;
    }

    buildDivTileNode(item) {
        const wrap = this.getEmptyDiv();
        const cardTile = new TileRender();

        const viewType = item.value === null ? CARD_VIEW_TYPE.CUT_EMPTY : CARD_VIEW_TYPE.CUT;

        if (item.value !== null) {
            cardTile.initNode(wrap, item, viewType);
        }

        return wrap;
    }
}