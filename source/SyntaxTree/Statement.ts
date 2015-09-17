/// <reference path="Source" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/EndOfFile" />

module Magic.SyntaxTree {
	export class Statement {
		constructor() {
		}
		private static statementParsers = <((source: Source) => Statement)[]> new Array()
		static addParser(parser: (source: Source) => Statement) {
			Statement.statementParsers.push(parser)
		}
		static parse(source: Source): Statement {
			var result: Statement
			var i = 0
			while (!(result = Statement.statementParsers[i]))
				i++
			return result
		}
		static parseAll(source: Source): Statement[] {
			var result = new Array<Statement>()
			var next: Statement
			while (source.peek() &&	!(source.peek().isSeparator("}")) && (next = Statement.parse(source))) {
				result.push(next)
			}
			return result
		}
	}
}
