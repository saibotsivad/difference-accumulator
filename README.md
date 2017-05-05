# difference-accumulator

Accumulate differences in an object, get the total difference, reset the accumulator.

## install

The normal way:

```bash
npm install difference-accumulator
```

## use

Create a new accumulator with the original object:

```js
const accumulator = require('difference-accumulator')
const originalData = {
	firstName: 'Bilbo',
	lastName: 'Baggins'
}
const acc = accumulator(originalData)
```

Apply a change:

```js
acc.accumulate({ firstName: 'Frodo' })
```

Get out the sum of the changes:

```js
const diff = acc.difference()
// diff = {
// 	firstName: 'Frodo'
// }
```

Undo the accumulated changes:

```js
acc.clear()
const diff = acc.difference()
// diff = {}
```

## api

### `acc = accumulator(originalData)`

* `originalData` *(object, optional)*

Create a new accumulator by passing in an object property.

If `originalData` is not specified, an object literal `{}` will
be used.

### `acc.accumulate(delta)`

* `delta` *(object, optional)*

The change to be applied to the original data.

If `delta` is not specified, no difference will be accumulated.

For example:

```js
acc.accumulate({
	firstName: 'Frodo'
})
acc.accumulate({
	relationships: {
		uncle: 'Bilbo'
	}
})
```

Will accumulate to the total delta:

```js
const difference = {
	firstName: 'Frodo',
	relationships: {
		uncle: 'Bilbo'
	}
}
```

Accumulating falsey values (including `undefined`) will
yield a difference which includes those properties:

```js
const acc = accumulate({ firstName: 'Bilbo' })
acc.accumulate({ firstName: undefined })
// diff = {
// 	firstName: undefined
// }
```

Accumulating values identical to the original data will
yield a difference which *does not* include that change:

```js
const acc = accumulate({ firstName: 'Bilbo' })
acc.accumulate({ firstName: 'Bilbo' })
// diff = {}
```

Note that the comparison is done using `===` on each property, therefore:

```js
const acc = accumulate({})
acc.accumulate({ firstName: undefined })
// diff = {}
```

### `acc.difference()`

This will yield the current total accumulated difference.

### `acc.clear()`

This will clear the total accumulated difference.

## license

Published and released under the [Very Open License](http://veryopenlicense.com).
