import BypassDefinition from './BypassDefinition.js';

export default class Link1s extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {  
        window.setInterval = f => setTimeout(f,1)
        this.helpers.awaitElement("#link1s", a => {
            this.helpers.safelyNavigate(a.href);
        });

        let scripts = document.getElementsByTagName('script');
        let secondScript = scripts[scripts.length - 2];
        // Get the script's source
        let scriptSrc = secondScript.innerHTML;
        // Find the first location.href in the script and get the value of location.href
        let url = scriptSrc.split('location.href = "')[1].split('"')[0];
        alert(url);
        this.helpers.safelyNavigate(url);
    }
}



export const matches = ['https://anhdep24.com', 'https://hocbeauty.com']