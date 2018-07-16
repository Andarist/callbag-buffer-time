import buffer from 'callbag-buffer'
import interval from 'callbag-interval'

export default function bufferTime(ms) {
  return source => buffer(interval(ms))(source)
}
