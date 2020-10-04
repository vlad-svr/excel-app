import {$} from '@core/dom';

export function resizeHandler(event, $root) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let value

        $resizer.css({
            'opacity': 1,
            [sideProp]: '-5000px'
        })

        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.pageX - coords.right - window.scrollX
                    + $resizer.getCoords().width / 2
                value = coords.width + delta
                $resizer.css({'right': -delta + 'px'})
            } else {
                const delta = e.pageY - coords.bottom - window.scrollY
                    + $resizer.getCoords().height / 2
                value = coords.height + delta
                $resizer.css({'bottom': -delta + 'px'})
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            if (type === 'col') {
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(item => item.style.width = value + 'px')
            } else {
                $parent.css({height: value + 'px'})
            }

            resolve({
                value,
                type,
                id: $parent.data[type]
            })
            $resizer.clearCss()
        }
    })
}
