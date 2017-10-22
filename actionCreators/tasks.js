const actions = require('../actions')

const addTask = ({ id, text, completed = false }) => {
    return {
        type: actions.ADD_TASK,
        id,
        text,
        completed
    }
}

const removeTask = ({ id }) => {
    return {
        type: actions.REMOVE_TASK,
        id
    }
}

const toggleTask = ({ id }) => {
    return {
        type: actions.TOGGLE_TASK,
        id
    }
}

module.exports = {
    addTask,
    removeTask,
    toggleTask,
}
