export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function nextSelector(key, {row, col}) {
    const MIN_VALUE = 1
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowUp':
            if (row > MIN_VALUE) row--
            break
        case 'ArrowLeft':
            if (col > MIN_VALUE) col--
            break
    }

    return `[data-id="${row}:${col}"`
}
