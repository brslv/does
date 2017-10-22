const { ADD_TASK } = require('../actions')
const { combineReducers } = require('redux')

const tasks = (state = [], action) => {
    switch(action.type) {
        case ADD_TASK:
            return [{ id: action.id, text: action.text, completed: action.completed }, ...state]
        default: return state
    }
}

module.exports = combineReducers({ tasks })
