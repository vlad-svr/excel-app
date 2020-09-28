import {defaultStyles, defaultTitle} from '@/constants';
import {clone} from '@core/utils';

const defaultState = {
    title: defaultTitle,
    dateCreated: new Date().toJSON(),
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
