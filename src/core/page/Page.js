export class Page {
    constructor(param) {
        this.param = param || Date.now().toString()
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented')
    }

    afterRender() {}

    destroy() {}
}
