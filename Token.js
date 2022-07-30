class Token {
    constructor(pos, type, value = null) {
        this.pos = pos;
        this.type = type;
        this.value = value;
    }

    compareSelfTo(type, value) {
        return this.type === type && this.value === value;
    }
}

module.exports = Token;
