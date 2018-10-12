import pipe from 'callbag-pipe'
import subject from 'callbag-subject'
import subscribe from 'callbag-subscribe'

import bufferTime from '../src'

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

test('works', () => {
  const actual = []

  const source = subject()

  const dispose = pipe(
    source,
    bufferTime(100),
    subscribe(values => {
      actual.push(values)
    }),
  )

  return Promise.resolve()
    .then(() => {
      expect(actual).toEqual([])
      source(1, 1)
      source(1, 2)
      source(1, 3)
    })
    .then(() => {
      expect(actual).toEqual([])
      return delay(110)
    })
    .then(() => {
      source(1, 4)
      expect(actual).toEqual([[1, 2, 3]])
      return delay(100)
    })
    .then(() => {
      expect(actual).toEqual([[1, 2, 3], [4]])
      return delay(100)
    })
    .then(() => {
      expect(actual).toEqual([[1, 2, 3], [4], []])
      dispose()
    })
})
