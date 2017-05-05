const entries = require('object.entries-ponyfill')

const defaultOptions = { merge: defaultMerge, diff: defaultDiff }
module.exports = function differenceAccumulator(originalData = emptyObject(), { merge = defaultMerge, diff = defaultDiff } = defaultOptions) {
	const original = merge(originalData)
	let delta = emptyObject()

	return {
		accumulate(change) {
			const allChangesTogether = merge(delta, change)
			delta = diff(original, allChangesTogether)
		},
		difference() {
			return merge(delta)
		},
		clear() {
			delta = emptyObject()
		}
	}
}

function defaultMerge(...objects) {
	return Object.assign({}, ...objects)
}

function defaultDiff(original, change) {
	return entries(change)
		.filter(([ key, value ]) => original[key] !== value)
		.reduce((acc, [ key, value ]) => (acc[key] = value, acc), emptyObject())
}

function emptyObject() {
	return Object.create(null)
}
