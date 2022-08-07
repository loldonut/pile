const readline = require('readline');
const { stdin: input, stdout: output } = process;

const run = require('./run');

function REPL() {
    const rl = readline.createInterface(input, output);

    rl.question('> ', (ans) => {
        if (!ans) {
            rl.close();
            REPL();
        }

        run(ans);
        rl.close();
        REPL();
    });
}

module.exports = REPL;
