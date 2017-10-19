const List = require('./commands/List')
const Add = require('./commands/Add')
const program = require('commander')

class App {
    constructor({ config, inputSource }) {
        this._config = config
        this._inputSource = inputSource
    }

    run() {
        this._registerCommands()
        this._parseCommands()
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
