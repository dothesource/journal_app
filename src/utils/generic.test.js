import { last } from './generic'

describe('last', () => {
  it('returns the last element of an array', () => {
    expect(last([1, 2, 3])).toBe(3)
    expect(last([1])).toBe(1)
    expect(last([])).toBe(undefined)
  })
})
