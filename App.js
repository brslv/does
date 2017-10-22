const { promisify } = require('util')
const path = require('path')
const fs = require('fs')

const List = require('./commands/List')
const Add = require('./commands/Add')
const reducers = require('./reducers')
const { createStore } = require('redux')
const program = require('commander')

class App {
    constructor({ config, inputSource }) {
        this._config = config
        this._inputSource = inputSource
    }

    run() {
        this._store = createStore(reducers)
        this._store.subscribe(() => console.log(this._store.getState()))

        this._loadTasksFile(path.resolve(__dirname, this._config.tasksFile))
        this._registerCommands()
        this._parseCommands()
    }

    async _loadTasksFile(tasksFilePath) {
        const readFileAsync = promisify(fs.readFile)

        try {
            const content = await readFileAsync(tasksFilePath, 'utf8')
            const tasks = this._parseTasks(content.split('\n').filter(task => task !== ''))

            // add tasks to the store
        } catch (err) {
            return console.log(err)
        }
    }

    _parseTasks(tasks) {
        const completed = tasks.filter(task => task.startsWith('-'))
        const notCompleted = tasks.filter(task => task.startsWith('x'))

        return { completed, notCompleted }
    }

    _registerCommands() {
        program
            .version(global.VERSION)

        program
            .command('add <task>')
            .alias('a')
            .description('Add a new task to the tasks list')
            .action((task, options) => {
                const add = new Add(this._store)
                add.handle(task, options)
            })

        program
            .command('list')
            .alias('l')
            .description('List all tasks from the tasks list')
            .action(options => {
                const list = new List(this._store)
                list.handle(options)
            })
    }

    _parseCommands() {
        program.
            parse(this._inputSource)
    }
}

module.exports = App
