describe('component actions combiner', () => {
  afterEach(() => jest.resetModules())

  it('merges actions into one object', () => {
    global.PUBSWEET_COMPONENTS = [
      {
        client: {
          reducers: () => ({ default: { name: 'handleCows' } }),
        },
      },
      {
        frontend: {
          reducers: () => ({ default: { name: 'handleDogs' } }),
        },
      },
      {
        client: {
          reducers: {
            handleDoors: () => 'I am reducer',
          },
        },
      },
      {
        server: "don't care",
      },
    ]
    const reducers = require('../../src/components/reducers')
    expect(reducers).toEqual([
      { handleCows: { name: 'handleCows' } },
      { handleDogs: { name: 'handleDogs' } },
      { handleDoors: 'I am reducer' },
    ])
  })

  it('throws if reducers exported incorrectly', () => {
    global.PUBSWEET_COMPONENTS = [
      {
        client: {
          reducers: [() => 'wrong', () => 'export'],
        },
      },
    ]
    expect(() => {
      require('../../src/components/reducers')
    }).toThrow()
  })
})
