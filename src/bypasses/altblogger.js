import BypassDefinition from './BypassDefinition.js'

export default class Altblogger extends BypassDefinition {
    constructor() {
        super();
    }

    execute() {
        document.getElementById("form").submit();
        document.getElementById("surl").click();
    }
}

export const matches = ['altblogger.net']