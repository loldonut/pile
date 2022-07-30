const Lexer = require('./Lexer');
const Parser = require('./Parser');
const Interpreter = require('./Interpreter');

function run(text) {
    const lexer = new Lexer(text);
    const tokens = lexer.start();

    const parser = new Parser(tokens);
    const tree = parser.parse();

    const interpreter = new Interpreter();
    const result = interpreter.visit(tree);

    console.log(result.value);
}

module.exports = run;
