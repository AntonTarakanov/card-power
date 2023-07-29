import { PioneerInfo } from './PioneerInfo';

export class ConfigHelper extends PioneerInfo {
    initFields(config) {
        for (let key in config) {
            this[key] = config[key];
        }
    }
}