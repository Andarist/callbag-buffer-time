# callbag-buffer-time

Callbag operator which buffers source values until provided time has passed.

## Example

```js
import bufferTime from 'callbag-buffer-time'
import forEach from 'callbag-for-each'
import fromEvent from 'callbag-from-event'
import map from 'callbag-map'
import pipe from 'callbag-pipe'

const btn = document.getElementById('#release')

pipe(
  fromEvent(document, 'click'),
  map(() => Math.floor(Math.random() * 100))
  bufferTime(5000),
  forEach(values => {
    console.log(values) // [86, 93, 57, 64] ...
  })
)
```
