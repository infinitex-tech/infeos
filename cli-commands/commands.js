const path = require('path');
const node = require('./node/node');
const init = require('./init/init');
const compile = require('./compile/compile');
const deploy = require('./deploy/deploy');
const test = require('./test/test');
const logger = require('./../utils/logger/logger').logger;

const commands = [
    {
        command: 'run-node',
        description: 'Run a local EOS node by default',
        argumentsProcessor: () => {},
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
        description: 'Initialize dApp folder structure and files ready for using',
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
        description: 'Run the deployment script',
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
        command: 'compile [abi]',
        description: 'Compiles the smart contracts and generates WASM & ABI',
        argumentsProcessor: (yargs) => { 
            yargs.positional('abi', {
				describe: 'Flag specifying the generation of an ABI file',
				type: 'boolean',
				default: false
			});
        },
        commandProcessor: async (argv) => {
            try {
                await compile.run(argv.abi);
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