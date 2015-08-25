/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Literal extends Substance {
		constructor(region: IO.Region, original: string) {
			super(original, region)
		}
	}
}
