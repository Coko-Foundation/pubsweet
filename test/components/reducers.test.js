describe('component actions combiner', () => {
  afterEach(() => jest.resetModules())

  it('merges actions into one object', () => {
    global.PUBSWEET_COMPONENTS = [
      {
        client: {
          reducers: () => ({default: {name: 'handleCows'}})
        }
      },
      {
        frontend: {
          reducers: [() => ({default: {name: 'handleDogs'}})]
        }
      },
      {
        client: {
          reducers: {
            handleDoors: () => 'I am reducer'
          }
        }
      },
      {
        backend: "don't care"
      }
    ]
    const reducers = require('../../src/components/reducers')
    expect(reducers).toEqual([
      {handleCows: {name: 'handleCows'}},
      {handleDogs: {name: 'handleDogs'}},
      {handleDoors: 'I am reducer'}
    ])
  })
})
