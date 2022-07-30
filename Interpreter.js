const { NumberValue } = require('./Values');

class Interpreter {
    constructor() {}

    visit(node) {
        const name = `visit_${node.constructor.name}`;
        const method = this[name].bind(this, node);

        return method();
    }

    visit_NumberNode(node) {
        return new NumberValue(node.value);
    }

    visit_AddNode(node) {
        return new NumberValue(
            this.visit(node.NodeA).value +
            this.visit(node.NodeB).value
        );
    }

    visit_SubtractNode(node) {
        return new NumberValue(
            this.visit(node.NodeA).value -
            this.visit(node.NodeB).value
        );
    }

    visit_MultiplyNode(node) {
        return new NumberValue(
            this.visit(node.NodeA).value *
            this.visit(node.NodeB).value
        );
    }

    visit_DivideNode(node) {
        const res = this.visit(node.NodeA).value / this.visit(node.NodeB).value;

        // If trying to divide by Zero
        if (isNaN(res)) {
            console.error('Cannot devide by Zero!');
            process.exit(1);
        }

        return new NumberValue(
            this.visit(node.NodeA).value /
            this.visit(node.NodeB).value
        );
    }

    visit_PlusNode(node) {
        return this.visit(node.node);
    }

    visit_MinusNode(node) {
        return new NumberValue(
            (-(this.visit(node.node)))
        );
    }

    visit_PowNode(node) {
        return new NumberValue(
            this.visit(node.NodeA).value **
            this.visit(node.NodeB).value
        );
    }
}

module.exports = Interpreter;
