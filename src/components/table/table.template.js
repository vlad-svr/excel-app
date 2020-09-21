const CODES = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return function(_, col) {
        return `
            <div
                 class="cell"
                 data-col="${col+1}"
                 data-id="${row+1}:${col+1}"
                 data-type="cell"
                 contenteditable>             
            </div>
        `
    }
}

function toColumn(value, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index+1}">
            ${value}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, index, emptyCell = '') {
    const resize = index ?
        '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols, null, 'empty-cell'))
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join('')
        rows.push(createRow(cells, row+1))
    }
    return rows.join('')
}
