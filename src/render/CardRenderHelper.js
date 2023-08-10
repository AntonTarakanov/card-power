import { PioneerRenderMatrix } from '../library';
import { CARD_VIEW_TYPE } from '../cardLibrary/render/constants';

import { TileRender } from './components/Tile';

export class CardRenderHelper extends PioneerRenderMatrix {
    buildWrapTileNode(tile) {
        const result = super.buildWrapTileNode(tile);

        result.className = 'cardLib_tile_wrapCut color_wheat';

        if (tile.isSelected) {
            result.className = result.className + ' cardLib_tile_selected';
        }

        return result;
    }

    buildDivTileNode(item) {
        const onClickHandler = this.handler;
        const tileHandler = function(event) {
            return onClickHandler(event, this);
        }

        const wrap = this.getEmptyDiv();
        const cardTile = new TileRender();

        const viewType = item.value === null ? CARD_VIEW_TYPE.CUT_EMPTY : CARD_VIEW_TYPE.CUT;

        wrap.addEventListener('click', tileHandler);
        this.setAttributeInTile(wrap, item);

        if (item.value !== null) {
            cardTile.initNode(wrap, item, viewType);
        }

        return wrap;
    }
}