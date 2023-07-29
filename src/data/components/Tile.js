import { Card } from '../../cardLibrary';


export class Tile extends Card {
    constructor(position) {
        super();

        this.initTileInfo(position);
    }

    initTileInfo(position) {
        this[FIELDS.IS_SHOW] = false;
        this[FIELDS.POSITION] = { ...position };
    }
}

const FIELDS = {
    IS_SHOW: 'isShow',
    POSITION: 'position',
}