const init = require('./init/init');
const logger = require('./../utils/logger/logger').logger;

const commands = [
    {
        command: 'init',
        description: 'initialize dApp folder structure and files ready for using',
        argumentsProcessor: () => { },
        commandProcessor: async () => {
            try {
                await init.run();
            } catch (error) {
                logger.logError(error);
            }
        }
    },
]

module.exports = commands;