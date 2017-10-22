const { addTask } = require('../actionCreators')

class Add {
    constructor(store) {
        this._store = store;
    }

    handle(task, options) {
        this._store.dispatch(addTask({ id: 1, text: task }))
    }
}

module.exports = Add
