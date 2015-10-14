/// <reference path="Expression" />
/// <reference path="../Source" />


module Magic.SyntaxTree.Type {
	export class Tuple extends Expression {
		constructor(private children: Expression[], tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getChildren(): Expression[] {
			return this.children
		}
		static parse(source: Source): Expression {
			var result: Expression
			if (source.peek().isSeparator("(")) {
				var children: Expression[] = []
				do {
					source.next() // consume "(" or ","
					children.push(Expression.parse(source))
				} while (source.peek().isSeparator(","))
				if (!source.next().isSeparator(")"))
					source.raise("Expected \")\"")
				result = new Tuple(children, source.mark())
			}
			return result
		}
	}
	Expression.addParser(Tuple.parse)
}
