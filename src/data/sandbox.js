import { DeckAPI } from './components/DeckAPI';
import { CardDataAPI } from './CardDataAPI';

export const runSandboxDeckAPI = () => {
    const instance = new DeckAPI();

    console.log('runSandboxDeckAPI. Instance', instance);
};

export const runSandboxDataAPI = () => {
    const instance = new CardDataAPI();

    console.log('runSandboxDataAPI. Instance', instance);
};