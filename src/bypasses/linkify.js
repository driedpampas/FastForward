import BypassDefinition from './BypassDefinition.js'

export default class Linkify extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        allowPush()
        const href = document.getElementById('mainbutton').href;
        this.helpers.safelyNavigate(href);
    }

}

export const matches = ['ify.ac']