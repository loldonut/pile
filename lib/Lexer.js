const Position = require('./structures/Position');
const Token = require('./structures/Token');
const TokenTypes = require('./structures/TokenTypes');

class Lexer {
    constructor(text) {
        this.text = text;

        this.pos = new Position(-1, 1, 0);
        this.tokens = [];

        this.next();
    }

    next() {
        this.pos.next(this.char);

        this.char = this.pos.idx < this.text.length
            ? this.text[this.pos.idx]
            : null;
    }

    addToken(type, value = null) {
        this.tokens.push(new Token(
            this.pos.copy(),
            type,
            value,
        ));
    }

    start() {
        while (this.char != null) {
            // Ignored chars
            if (/(\s|\t|\n)/.test(this.char)) this.next();

            else if (/[0-9]/.test(this.char)) {
                this.getNum();
            }

            else if (this.char === '(') {
                this.addToken(TokenTypes.LeftParen);
                this.next();
            }
            else if (this.char === ')') {
                this.addToken(TokenTypes.RightParen);
                this.next();
            }

            else if (this.char === '+') {
                this.addToken(TokenTypes.Plus);
                this.next();
            }
            else if (this.char === '-') {
                this.addToken(TokenTypes.Minus);
                this.next();
            }
            else if (this.char === '*') {
                this.next();
                if (this.char === '*') this.addToken(TokenTypes.Pow);
                else this.addToken(TokenTypes.Multiply);
            }
            else if (this.char === '/') {
                this.addToken(TokenTypes.Divide);
                this.next();
            }

            else {
                const char = this.char;
                this.next();

                console.error(`Unexpected Character: '${char}' at ${this.pos.line}:${this.pos.col}`);
                process.exit(1);
            }
        }

        return this.tokens;
    }

    getNum() {
        let num = '';
        while (this.char != null && /[0-9]/.test(this.char)) {
            num += this.char;
            this.next();
        }

        this.tokens.push(new Token(
            this.pos.copy(),
            TokenTypes.Number,
            parseInt(num),
        ));
    }
}

module.exports = Lexer;
