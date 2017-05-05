module.exports = function differenceAccumulator(originalData = {}, assign) {
	if (!assign) {
		assign = Object.assign
	}

	const original = assign({}, originalData)
	let delta = {}

	return {
		accumulate(difference) {
			delta = assign({}, delta, difference)
		},
		difference() {
			return assign({}, delta)
		},
		clear() {
			delta = {}
		}
	}
}
