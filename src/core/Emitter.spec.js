import {Emitter} from './Emitter';


describe('Emmiter:', () => {
    let emmiter
    let handler

    beforeEach(() => {
        emmiter = new Emitter()
        handler = jest.fn()
    })

    test('should be defined', () => {
        expect(emmiter).toBeDefined()
        expect(emmiter.subscribe('Test', () => {})).toBeDefined()
        expect(emmiter.emit('Test', {a: 1})).toBeDefined()
    })

    test('should notify listeners', () => {
        emmiter.subscribe('Test:test', handler)
        emmiter.emit('Test:test', 'done')

        expect(handler).toHaveBeenCalled()
        expect(handler).toHaveBeenCalledWith('done')
    })
})
