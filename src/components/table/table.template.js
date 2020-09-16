const CODES = {
    A: 65,
    Z: 90
}

function toCell() {
        return `
            <div class="cell" contenteditable></div>
        `
}

function toColumn(value) {
    return `
        <div class="column">${value}</div>
    `
}

function createRow(content, index, emptyCell = '') {
    return `
        <div class="row">
            <div class="row-info ${emptyCell}">${index ? index : ''}</div>
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

// `
//             <div class="row">
//
//                 <div class="row-info empty-cell"></div>
//
//                 <div class="row-data">
//                     <div class="column">A</div>
//                     <div class="column">B</div>
//                     <div class="column">C</div>
//                 </div>
//
//             </div>
//
//             <div class="row">
//
//                 <div class="row-info">1</div>
//
//                 <div class="row-data">
//                     <div class="cell selected" contenteditable>A1</div>
//                     <div class="cell" contenteditable>B1</div>
//                     <div class="cell" contenteditable>C1</div>
//                 </div>
//
//             </div>
//             <div class="row">
//
//                 <div class="row-info">2</div>
//
//                 <div class="row-data">
//                     <div class="cell" contenteditable>A2</div>
//                     <div class="cell" contenteditable>B2</div>
//                     <div class="cell" contenteditable>C2</div>
//                 </div>
//
//             </div>
//         `
