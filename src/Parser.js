const TokenTypes = require('./structures/TokenTypes');
const {
    AddNode,
    DivideNode,
    MinusNode,
    MultiplyNode,
    NumberNode,
    PlusNode,
    PowNode,
    SubtractNode,
} = require('./structures/Nodes');

class Parser {
    constructor(tokens) {
        this.tokens = tokens;

        this.idx = -1;
        this.token = null;

        this.next();
    }

    next() {
        this.idx++;

        this.token = this.idx < this.tokens.length
            ? this.tokens[this.idx]
            : null;
    }

    errOut(token) {
        console.error(`SyntaxError: Unexpected Token at ${token.pos.line}:${token.pos.col}`);
        process.exit(1);
    }

    parse() {
        if (this.token == null) return null;

        const result = this.expr();

        if (this.token != null) this.errOut(this.token);

        return result;
    }

    expr() {
        let result = this.term();

        while (
            this.token != null &&
            [TokenTypes.Plus, TokenTypes.Minus, TokenTypes.Pow]
                .includes(this.token.type)
        ) {
            if (this.token.type === TokenTypes.Plus) {
                this.next();
                result = new AddNode(result, this.term());
            }
            else if (this.token.type === TokenTypes.Minus) {
                this.next();
                result = new SubtractNode(result, this.term());
            }
            else if (this.token.type === TokenTypes.Pow) {
                this.next();
                result = new PowNode(result, this.term());
            }
        }

        return result;
    }
        
    term() {
        let result = this.factor();

        while (
            this.token != null &&
            [TokenTypes.Multiply, TokenTypes.Divide]
                .includes(this.token.type)
        ) {
            if (this.token.type === TokenTypes.Multiply) {
                this.next();
                result = new MultiplyNode(result, this.factor());
            }
            else if (this.token.type === TokenTypes.Divide) {
                this.next();
                result = new DivideNode(result, this.factor());
            }
        }

        return result;
    }

    factor() {
        const tok = this.token;

        switch (tok.type) {
            case TokenTypes.LeftParen:
                this.next();
                const result = this.expr();

                if (this.token.type !== TokenTypes.RightParen) {
                    this.errOut(this.token);
                }

                this.next();
                return result;

            case TokenTypes.Number:
                this.next();
                return new NumberNode(tok.value);

            case TokenTypes.Plus:
                this.next();
                return new PlusNode(this.factor());

            case TokenTypes.Minus:
                this.next();
                return new MinusNode(this.factor());
            
            default:
                this.errOut(this.token);
        }
    }
}

module.exports = Parser;
