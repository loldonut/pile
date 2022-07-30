#!/usr/bin/env node
const run = require('./run');
const REPL = require('./REPL');

const { existsSync, readFileSync } = require('node:fs');

const log = (content) => process.stdout.write((content ?? '') + '\n');
const err = (err) => process.stderr.write((err ?? '') + '\n');

process.on('beforeExit', (code) => {
    log(`\nProcess exited with code: ${code}`);
});

function CLI(args) {
    const filename = args[0];
    if (!filename) {
        log('Going into REPL mode...');
        REPL();
        return;
    }

    if (!existsSync(filename)) {
        err(`No file called '${filename}' was found!`);
        return;
    }

    log(`Running file: ${filename}`);
    const fileContent = readFileSync(filename, {
        encoding: 'utf8',
    });
    run(fileContent);
}

module.exports = CLI;
