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

        const btn6 = document.querySelector("#btn6");
            if (btn6) {
                btn6.click();
        }
    }
}

export const matches = ['https://anhdep24.com', 'https://hocbeauty.com']