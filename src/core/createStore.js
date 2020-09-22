export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let listeners = []

    return {
        subscribe(fn) {
            listeners.push(fn)
            // listeners.forEach(fn => fn())
            return {
               unsubscribe() {
                   listeners = listeners.filter(l => l !== fn)
               }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(fn => fn(state))
        },

        getState() {
            return JSON.parse(JSON.stringify(state))
        }
    }
}
