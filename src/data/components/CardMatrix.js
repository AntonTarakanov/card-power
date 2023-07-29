import { PioneerMatrix } from '../../library';

import { Tile } from './Tile';

export class CardMatrix extends PioneerMatrix {
    createMatrixItem(x, y) {
        const result = super.createMatrixItem(x, y);

        return new Tile(result);
    }
}