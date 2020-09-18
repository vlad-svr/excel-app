class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        } else {
            return this.$el.outerHTML.trim()
        }
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    clear() {
        this.html('')
        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    css(styles) {
        Object
            .keys(styles)
            .forEach(key => this.$el.style[key] = styles[key])
        return this
    }

    clearCss() {
        this.$el.style = ''
        return this
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    get data() {
        return this.$el.dataset
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) el.classList.add(classes)
    return $(el)
}
