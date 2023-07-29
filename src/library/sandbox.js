import { PioneerDataHelper } from './data/PioneerDataHelper';
import { PioneerRenderMatrix } from './render/PioneerRenderMatrix';

export const runRenderSandbox = () => {
    function renderHandler(event, target) {
        const position = PioneerRenderMatrix.getPositionFromNode(target);

        console.log(position);
    }

    return new PioneerRenderMatrix(renderHandler, {}, true);
}

export const runDataSandbox = () => {
    function dataHandler() {
        console.log('dataHandler');
    }
    return new PioneerDataHelper(dataHandler);
}

export const runFullSandbox = () => {
    const dataSandboxResult = runDataSandbox();
    const renderSandboxResult = runRenderSandbox();

    renderSandboxResult.initRender(dataSandboxResult.matrix);
}