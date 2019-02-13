const path = require('path');
const node = require('./node/node');
const init = require('./init/init');
const deploy = require('./deploy/deploy');
const test = require('./test/test');
const logger = require('./../utils/logger/logger').logger;

const commands = [
    {
        command: 'run-node [network]',
        description: 'Run a local EOS node by default',
        argumentsProcessor: (yargs) => { 
            yargs.positional('network', {
				describe: 'Specifies the network which will be used for the node',
				type: 'string',
				default: 'EOS'
			});
        },
        commandProcessor: async () => {
            try {
                await node.run();
            } catch (error) {
                logger.logError(error);
            }
        }
    },
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
    {
        command: 'deploy',
        description: 'run deployment',
        argumentsProcessor: () => { },
        commandProcessor: async () => {
            try {
                await deploy.run();
            } catch (error) {
                logger.logError(error);
            }
        }
    },
    {
        command: 'test [path]',
        description: 'Run all the tests that are in the test directory',
        argumentsProcessor: (yargs) => { 
            yargs.positional('path', {
				describe: 'Specifies the path in which tests should be ran',
				type: 'string',
				default: path.normalize('./test')
			});
        },
        commandProcessor: async (argv) => {
            try {
                await test.run(argv.path);
            } catch (error) {
                logger.logError(error);
            }
        }
    }
]

module.exports = commands;