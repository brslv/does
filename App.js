const { promisify } = require('util')
const path = require('path')
const fs = require('fs')

const List = require('./commands/List')
const Add = require('./commands/Add')
const program = require('commander')

class App {
    constructor({ config, inputSource }) {
        this._config = config
        this._inputSource = inputSource
    }

    run() {
        this._loadTasksFile(this._resolveTasksFilePath())
        this._registerCommands()
        this._parseCommands()
    }

    async _loadTasksFile(tasksFilePath) {
        const readFileAsync = promisify(fs.readFile)

        try {
            const content = await readFileAsync(tasksFilePath + 'err', 'utf8')
        } catch (err) {
            return console.log(err)
        }

        console.log(content)
    }

    _resolveTasksFilePath() {
        return path.resolve(__dirname, this._config.tasksFile)
    }

    _registerCommands() {
        program
            .version(global.VERSION)

        program
            .command('add <task>')
            .alias('a')
            .description('Add a new task to the tasks list')
            .action((new Add()).handle)

        program
            .command('list')
            .alias('l')
            .description('List all tasks from the tasks list')
            .action((new List()).handle)
    }

    _parseCommands() {
        program.
            parse(this._inputSource)
    }
}

module.exports = App
