import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    CHANGE_TITLE,
    TABLE_RESIZE,
    UPDATE_DATE
} from '@/redux/types';

// Pure function
export function rootReducer(state, action) {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {
                ...state,
                [field]: value(field, state, action)
            }
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                currentText: action.data.value,
                [field]: value(field, state, action)
            }
        case CHANGE_TITLE:
            field = 'title'
            return {
                ...state,
                [field]: action.data
            }
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case UPDATE_DATE:
            return {...state, dateCreated: new Date().toJSON()}

        default: return state
    }
}

function value(field, state, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}
