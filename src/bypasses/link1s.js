import BypassDefinition from './BypassDefinition.js';

export default class Link1s extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {  
        window.setInterval = f => setTimeout(f,1)
        this.helpers.awaitElement("#link1s", a => {
            a.click();
        });
    }
}

export const matches = ['anhdep24.com', 'hocbeauty.com']