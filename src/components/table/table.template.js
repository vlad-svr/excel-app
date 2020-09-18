const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, col) {
    return `
        <div class="cell" data-col="${col}"
         contenteditable></div>
    `
}

function toColumn(value, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
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

    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(cols, null, 'empty-cell'))
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells, i + 1))
    }
    return rows.join('')
}
