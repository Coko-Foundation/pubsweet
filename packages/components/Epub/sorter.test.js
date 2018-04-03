const shuffle = require('lodash/shuffle')
const sorter = require('./sorter')

test('sorts chapters', () => {
  const chapters = [
    {
      division: 'front',
      index: 0,
    },
    {
      division: 'front',
      index: 1,
    },
    {
      division: 'body',
      index: 0,
    },
    {
      division: 'body',
      index: 1,
    },
    {
      division: 'body',
      index: 2,
    },
    {
      division: 'back',
      index: 0,
    },
    {
      division: 'back',
      index: 1,
    },
  ]

  const shuffledChapters = shuffle(chapters)

  expect(shuffledChapters).not.toEqual(chapters)

  const sortedChapters = shuffledChapters.sort(sorter)

  expect(sortedChapters).toEqual(chapters)
})
