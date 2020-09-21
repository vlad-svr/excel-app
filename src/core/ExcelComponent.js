import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []

        this.prepare()
    }

    // Настраиваем наш компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }

    // Уведомляем слушателей про события event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на события event
    $on(event, fn) {
        const onsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(onsub)
    }

    // Инициализируем компонент
    // Добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }

    // Удаляем компонент
    // Чистим слушателей
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
