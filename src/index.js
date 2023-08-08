import CardPowerGameAPI from './CardPowerGameAPI';

import { config } from './config';

function createApp() {
    const cardPower = new CardPowerGameAPI(config);

    cardPower.start();
}

createApp();