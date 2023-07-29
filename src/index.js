import CardPowerGameApp from './CardPowerGame';

import { config } from './config';

function createApp() {
    const cardPower = new CardPowerGameApp(config);

    cardPower.start();
}

createApp();