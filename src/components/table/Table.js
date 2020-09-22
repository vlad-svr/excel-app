import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
    shouldResize,
    isCell,
    nextSelector
} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@/core/dom'
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(50, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selectCell(this.$root.find(`[data-id="1:1"]`))

        this.$on('formula:input', text => {
            this.selection.current.text(text)
            this.updateTextInStore(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event, this.$root)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error:', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            this.$emit('table:select', $(event.target))
            if (event.ctrlKey) {
                this.selection.selectKey($(event.target))
            } else if (event.shiftKey) {
                this.selection.selectShift($(event.target), this.$root)
            } else {
                this.selection.select($(event.target))
             }
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowUp',
            'ArrowDown',
            'ArrowRight',
            'ArrowLeft'
        ]

        const {key} = event

        if (keys.includes(key) && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }
}
