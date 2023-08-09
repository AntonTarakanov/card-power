import { PioneerRender } from './PioneerRender';
import { Header } from './components/Header';
import { COMMON_CLASS_NAMES, COMMON_DOM_IDS } from './constants';

/**
 * Базовые методы для создания приложения.
 * Шапка, поле приложения по matrix, информационное поле.
 *
 * TODO: доработать переопределение COMMON_CLASS по аналогии с DOM_IDS.
 */
export class PioneerRenderApp extends PioneerRender {

    /**
     * DOM_IDS - объект с id.
     */
    constructor(DOM_IDS, isDev) {
        super();

        this.initDomIds(DOM_IDS);

        this.headerInstance = this.getHeaderInstance();
        this.additionalFieldInstance = this.getAdditionalFieldInstance();
        this.appFieldInstance = this.getAppFieldInstance();

        this.isDev = isDev;

        if (this.isDev) {
            window.PioneerRenderApp = this;
            console.log('PioneerRenderApp', this);
        }
    }

    initRender() {
        const appForm = this.getAppFormNode();

        document.body.appendChild(appForm);
    };

    initDomIds(DOM_IDS) {
        this.DOM_IDS = { ...COMMON_DOM_IDS, ...DOM_IDS };
    }

    /**
     * Базовая пустая форма(appForm) с id:
     *  основное поле (appField)
     *  вспомогательное поле (additionalField)
     *  header
     */
    getAppFormNode() {
        const appNodeWrap = this.getDiv(COMMON_CLASS_NAMES.APP, this.DOM_IDS.root);
        const contentNode = this.getDiv(COMMON_CLASS_NAMES.JUSTIFY_CENTER);

        const appFieldNode = this.appFieldInstance.buildNode();
        const additionalFieldNode = this.additionalFieldInstance.buildNode();
        const headerNode = this.headerInstance.buildNode(
            COMMON_CLASS_NAMES.HEADER, COMMON_CLASS_NAMES.HEADER_IMG, COMMON_DOM_IDS.HEADER
        );

        contentNode.append(appFieldNode, additionalFieldNode);
        appNodeWrap.append(headerNode, contentNode);

        return appNodeWrap;
    }

    /**
     * Заглушка базового игрового/рабочего поля.
     */
    getAppFieldInstance() {
        const appFieldInstance = new PioneerRender();

        appFieldInstance.MAIN_ID = this.DOM_IDS.MAIN;

        appFieldInstance.buildNode = function() {
            return this.getDiv(COMMON_CLASS_NAMES.FLEX, this.MAIN_ID);
        }

        appFieldInstance.getNode = function() {
            return this.getElementById(this.MAIN_ID);
        }

        return appFieldInstance;
    }

    /**
     * Заглушка базовой шапки.
     */
    getHeaderInstance() {
        return new Header();
    }

    /**
     * Заглушка базового дополинтельного поля.
     */
    getAdditionalFieldInstance() {
        const additionalFieldInstance = new PioneerRender();
        const additionalId = this.DOM_IDS.ADDITIONAL;

        additionalFieldInstance.buildNode = function() {
            return this.getDiv(null, additionalId);
        }

        return additionalFieldInstance;
    }

    getAdditionalFieldNode() {
        return this.getElementById(this.DOM_IDS.ADDITIONAL);
    }

    getHeaderNode() {
        return this.getElementById(this.DOM_IDS.HEADER);
    }

    getAppFieldNode() {
        return this.getElementById(this.DOM_IDS.MAIN);
    }

    getRootNode() {
        return this.getElementById(this.DOM_IDS.ROOT);
    }
}