import {storage} from '@core/utils';

function toHTML(key) {
    const table = storage(key)
    const id = key.split(':')[1]
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(table.dateCreated)
        .toLocaleDateString('ru-Ru', options)
    const time = new Date(table.dateCreated)
        .toLocaleTimeString()
    return `
        <li class="db__record">
            <a href="#excel/${id}">${table.title}</a>
            <strong>${date} ${time}</strong>
        </li>    
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
    keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`
    }
    return `
         <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
    
        <ul class="db__list">                            
            ${keys.map(toHTML)
                .sort()
                .reverse()
                .join('')}
        </ul>
`
}
