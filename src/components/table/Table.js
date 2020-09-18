import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.function';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(50)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(event, this.$root)
        }
    }

    onMousemove(event) {
    }

    onMouseup(event) {
    }
}
