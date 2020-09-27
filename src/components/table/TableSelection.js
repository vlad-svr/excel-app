import {range} from '@core/utils';

export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
    }

    selectGroup($group) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    selectKey($el) {
        this.group.push($el)
        $el.addClass(TableSelection.className)
    }

    selectShift($el, $root) {
        const $firstEl = this.current.id(true)
        const $secondEl = $el.id(true)

        const cols = range($firstEl.col, $secondEl.col)
        const rows = range($firstEl.row, $secondEl.row)

        const ids = cols.reduce((acc, col) => {
            rows.forEach(row => acc.push(`${row}:${col}`))
            return acc
        }, [])

        const $cells = ids.map(id => $root.find(`[data-id="${id}"]`))
        this.selectGroup($cells)
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    clear() {
        this.group.forEach(el => {
            el.removeClass(TableSelection.className)
            this.group = []
        })
    }
}


