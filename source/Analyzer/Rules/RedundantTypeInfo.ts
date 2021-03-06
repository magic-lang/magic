/// <reference path="../../Frontend/Token" />
/// <reference path="../../Frontend/TokenKind" />
/// <reference path="../Report" />
/// <reference path="../Violation" />
/// <reference path="../RuleKind" />
/// <reference path="Rule" />

module Magic.Analyzer.Rules {
	export class RedundantTypeInfo implements Rule {
		constructor() { }
		run(tokens: Frontend.Token[], report: Report) {
			for (var i = 0; i < tokens.length; i++) {
				if (tokens[i].kind == Frontend.TokenKind.KeywordFunc) {
					while (tokens[i].kind != Frontend.TokenKind.Eof && tokens[i].kind != Frontend.TokenKind.WhitespaceLineFeed && tokens[i].kind != Frontend.TokenKind.SeparatorLeftCurly) {
						if (tokens[i].kind == Frontend.TokenKind.SeparatorLeftParanthesis && this.previousNonWhitespaceToken(tokens, i).kind != Frontend.TokenKind.OperatorReturnType) {
							i++;
							var nextIsType = false;
							var idents: string[] = [];
							var types: string[] = [];
							while (tokens[i].kind != Frontend.TokenKind.SeparatorRightParanthesis && tokens[i].kind != Frontend.TokenKind.OperatorDeclareAssign) {
								if (tokens[i].kind == Frontend.TokenKind.Identifier || tokens[i].kind == Frontend.TokenKind.VarArgs) {
									if (nextIsType) {
										if (tokens[i + 1].kind == Frontend.TokenKind.OperatorMultiply) {
											types.push(tokens[i].value + "*")
										} else if(tokens[i + 1].kind == Frontend.TokenKind.SeparatorLeftBracket) {
											types.push(tokens[i].value + "[]")
										} else {
											types.push(tokens[i].value);
										}
									} else {
										idents.push(tokens[i].value);
									}
									nextIsType = nextIsType ? false : true;
								}
								i++;
							}
							var same = true;
							types.forEach(t => {
								if (t !== types[0]) {
									same = false;
								}
							});
							if (same && types.length > 1) {
								var id = "";
								for (var k = 0; k < idents.length - 1; k++) {
									id += idents[k] + ", ";
								}
								id += idents[idents.length - 1];
								var message = "redundant type information, reduce to (" + id + ": " + types[0] + ")";
								report.addViolation(new Violation(tokens[i].location, message, RuleKind.General));
							}
							break;
						}
						i++;
					}
				}
			}
		}
		private previousNonWhitespaceToken(tokens: Frontend.Token[], index: number) {
			var i = index - 1;
			while (i > 0 && Frontend.TokenKind[tokens[i].kind].indexOf("Whitespace") > -1) {
				i--;
			}
			return tokens[i];
		}
	}
}
