import { DeckAPI } from './DeckAPI';
import { DataAPI } from './DataAPI';

export const runSandboxDeckAPI = () => {
    const instance = new DeckAPI();

    console.log('runSandboxDeckAPI. Instance', instance);
};

export const runSandboxDataAPI = () => {
    const instance = new DataAPI();

    console.log('runSandboxDataAPI. Instance', instance);
};