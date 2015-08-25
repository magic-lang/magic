/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Gap" />

module Magic.Tokens {
	export class Substance extends Token {
		private pregap: Gap[]
		private postgap: Gap[]
		constructor(original: string, region: IO.Region) {
			super(original, region)
		}
		getPregap() { return this.pregap }
		setPregap(value: Gap[]) { this.pregap = value }
		getPostgap() { return this.postgap }
		setPostgap(value: Gap[]) { this.postgap = value }
	}
}
