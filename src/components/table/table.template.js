import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getText(state, id) {
    return state[id] || ''
}

function toCell(state, row) {
    return function(_, col) {
        col++
        const id = `${row+1}:${col}`
        const width = getWidth(state.colState, col)
        const textContent = getText(state.dataState, id)
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        return `
            <div
                 class="cell"
                 style="width: ${width}; ${styles}"
                 data-col="${col}"
                 data-id="${id}"
                 data-value="${textContent}"
                 data-type="cell"
                 contenteditable>
                 ${parse(textContent)}             
            </div>
        `
    }
}

function toColumn({value, index, width}) {
    return `
        <div
         class="column" 
         style="width: ${width}"
         data-type="resizable" 
         data-col="${index}">
            ${value}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, index, emptyCell = '', state) {
    const resize = index ?
        '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)
    return `
        <div 
        class="row" 
        style="height: ${height}"
        data-type="resizable" 
        data-row="${index}">
            <div class="row-info ${emptyCell}">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, ind) {
    return String.fromCharCode(CODES.A + ind)
}

function widthFrom(state) {
    return function(col, index) {
        return {
            value: col,
            index: ++index,
            width: getWidth(state, index)
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(widthFrom(state.colState))
        .map(toColumn)
        .join('')

    rows.push(createRow(cols, null, 'empty-cell', {}))
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')

        rows.push(createRow(cells, row+1, '', state.rowState))
    }
    return rows.join('')
}
