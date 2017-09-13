describe('component actions combiner', () => {
  afterEach(() => jest.resetModules())

  it('merges actions into one object', () => {
    global.PUBSWEET_COMPONENTS = [
      {
        client: {
          actions: () => ({cowSay: 'moo', dogSay: 'woof'})
        }
      },
      {
        frontend: {
          actions: [() => ({squirrelEat: 'nuts'})]
        }
      },
      {
        backend: "don't care"
      }
    ]
    const actions = require('../../src/components/actions')
    expect(actions).toEqual({cowSay: 'moo', dogSay: 'woof', squirrelEat: 'nuts'})
  })
})
