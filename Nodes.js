class NumberNode {
    constructor(value) {
        this.value = value;
    }
}

class BaseMathOpNode {
    constructor(NodeA, NodeB) {
        this.NodeA = NodeA;
        this.NodeB = NodeB;
    }
}

class PlusNode {
    constructor(node) {
        this.node = node;
    }
}

class MinusNode {
    constructor(node) {
        this.node = node;
    }
}

class AddNode extends BaseMathOpNode {}
class SubtractNode extends BaseMathOpNode {}
class MultiplyNode extends BaseMathOpNode {}
class DivideNode extends BaseMathOpNode {}
class PowNode extends BaseMathOpNode {}

module.exports = {
    AddNode,
    DivideNode,
    MinusNode,
    MultiplyNode,
    NumberNode,
    PlusNode,
    PowNode,
    SubtractNode,
};
