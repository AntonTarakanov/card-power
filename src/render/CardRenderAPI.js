import { CardRenderHelper } from './CardRenderHelper';

export class CardRenderAPI extends CardRenderHelper {
    checkEmptyTile(matrix) {
        const wrapNode = this.getMatrixWrap();

        matrix.forEach((row, index) => {
            const rowNode = wrapNode.childNodes[index];

            if (!rowNode) {
                this.addNewRow(row, index);
            } else {
                row.forEach(tile => {
                    const { x } = tile.position;
                    const tileNode = rowNode.childNodes[x];

                    if (!tileNode) {
                        rowNode.append(this.buildWrapTileNode(tile));
                    }
                });
            }
        });
    }
}