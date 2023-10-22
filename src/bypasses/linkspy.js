import BypassDefinition from './BypassDefinition.js'

export default class Linkspy extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {
        const url = document.querySelector("a.skipButton").getAttribute("href")
        this.helpers.safelyNavigate(url)
    }
}

export const matches = ['linkspy.cc']
