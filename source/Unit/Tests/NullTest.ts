/// <reference path="../Fixture" />
/// <reference path="../Constraints/Is" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class NullTest extends Fixture {
		constructor() {
			super("Null")
			this.add("null 1", () => {
				this.expect(null, Is.Null())
			})
			this.add("null 2", () => {
				var s: string = null
				this.expect(s, Is.Null())
			})
			this.add("undefined 3", () => {
				var s: string = ""
				this.expect(s, Is.Not().Null())
			})
		}
	}
}