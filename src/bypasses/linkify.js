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
        
        const scripts = document.getElementsByTagName('script');
        const lastScript = scripts[scripts.length - 1];
        const scriptContent = lastScript.innerHTML;

        const linkPattern = /https?:\/\/[^\s"]+/;
        const match = scriptContent.match(linkPattern);

        if (match) {
        const link = match[0];
        this.helpers.safelyNavigate(link);
        }
    }

}

export const matches = ['ify.ac']