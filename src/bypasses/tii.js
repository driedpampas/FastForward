import BypassDefinition from './BypassDefinition.js'

export default class Tii extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        document.getElementById('continue').disabled = false;
        const continueButton = document.getElementById('continue');
        continueButton.click();
    }
}

export const matches = ['tii.la']