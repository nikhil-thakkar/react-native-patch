#!/usr/bin/env node

const program = require('commander');
const { log, error, warning } = require('./logger');
const patcher = require('./patcher');
const { execSync } = require('child_process');
const path = require('path');
const isWin = /^win/i.test(require('os').platform())

const oldPort = 8081;
const whichReactNative = `${isWin ? 'where' : 'which'} react-native`

let projectName;

program
    .version('0.1.0', '-v --version')
    .command('init <name>')
    .action(function (name) {
        projectName = name;
    })
    .option('-p, --port [port]', 'Port number for metro bundler', 8088);

program.parse(process.argv);

if (typeof projectName === 'undefined') {
    log(error('Project name is required!'));
    log(`Sample usage:
    react-native-patch init AwesomeProject -p 9090`)
    process.exit(1);
}

const reactNativeInitCmd = `react-native init ${projectName}`;

try {
    execSync(whichReactNative);
    const projectPath = path.join(process.cwd(), projectName);
    execSync(reactNativeInitCmd, { stdio: [0, 1, 2] });
    patcher(path.resolve(projectPath), oldPort, program.port);
} catch (err) {
    log(warning(`React Native cli is not installed. 
    Please install it using:
    npm install -g react-native-cli`));
    process.exit(1);
}