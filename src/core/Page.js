export class Page {
    constructor(param) {
        this.param = param
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented')
    }

    afterRender() {}

    destroy() {}
}
