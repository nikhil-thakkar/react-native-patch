#!/usr/bin/env node

const program = require('commander')
const { log, error, warning } = require('./logger')
const patcher = require('./patcher')
const { execSync } = require('child_process')
const path = require('path')
const isWin = /^win/i.test(require('os').platform())
const fs = require('fs')
const harcodedPort = 8081
const whichReactNative = `${isWin ? 'where' : 'which'} react-native`
const folderTestCmd = '/node_modules/react-native/local-cli'

program
    .version('0.1.9', '-v, --version')
    .command('init <name>')
    .option('-p, --port [port]', 'Port number for metro bundler')
    .option('-t, --template', 'Generate the source code in typescript')
    .action(function (name, options) {
        const projectName = name
        const newPort = (options.port === true) ? 8088 : options.port
        const template = (options.template === true) ? `--template typescript && node ${projectName}/setup.js` : ''
        freshProject(projectName, newPort, template)
    })

program
    .command('patch')
    .option('-o, --oldPort [oldPort]', 'Old port number to patch')
    .option('-n, --newPort [newPort]', 'New port number')
    .action(function (options) {
        patch(options)
    })

program.parse(process.argv)

function freshProject(projectName, newPort, template) {
    if (typeof projectName === 'undefined') {
        log(error('Project name is required!'))
        log(`Sample usage:
        react-native-patch init AwesomeProject -p 9090`)
        process.exit(1)
    }

    const reactNativeInitCmd = `react-native init ${projectName} ${template}`

    try {
        execSync(whichReactNative)
        const projectPath = path.join(process.cwd(), projectName)
        execSync(reactNativeInitCmd, { stdio: [0, 1, 2] })
        patcher(path.resolve(projectPath), harcodedPort, newPort)
    } catch (err) {
        log(warning(`React Native cli is not installed. 
        Please install it using:
        npm install -g react-native-cli`))
        process.exit(1)
    }
}

function patch({ oldPort, newPort }) {
    
    try {
        const folder = path.join(process.cwd(), folderTestCmd)
        if (!fs.existsSync(folder)) throw new Error()

        oldPort = parseInt(oldPort) || harcodedPort
        newPort = parseInt(newPort)

        if (oldPort && (typeof oldPort === 'number') && newPort && (typeof newPort === 'number')) {
            patcher(path.resolve(process.cwd()), oldPort, newPort);
        } else {
            log(error('Port numbers are required!'));
            log(`Sample usage:
        react-native-patch patch -o 8081 -n 9000`)
        }
    } catch (err) {
        log(error('Please make sure you are inside a react native project directory'))
        process.exit(1)
    }
}
