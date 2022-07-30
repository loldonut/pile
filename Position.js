class Position {
    constructor(idx, line, col) {
        this.idx = idx;
        this.line = line;
        this.col = col;
    }
    
    next(curChar) {
        this.idx++;
        this.col++;

        if (curChar === '\n') {
            this.col = 1;
            this.line++;
        }
    }

    copy() {
        return new Position(this.idx, this.line, this.col);
    }
}

module.exports = Position;
