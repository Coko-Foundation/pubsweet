describe('component actions combiner', () => {
  afterEach(() => jest.resetModules())

  it('merges actions into one object', () => {
    global.PUBSWEET_COMPONENTS = [
      {
        client: {
          actions: () => ({ cowSay: 'moo', dogSay: 'woof' }),
        },
      },
      {
        frontend: {
          actions: () => ({ squirrelEat: 'nuts' }),
        },
      },
      {
        server: "don't care",
      },
    ]
    const actions = require('../../src/components/actions')
    expect(actions).toEqual({
      cowSay: 'moo',
      dogSay: 'woof',
      squirrelEat: 'nuts',
    })
  })

  it('throws if actions is exported incorrectly', () => {
    global.PUBSWEET_COMPONENTS = [
      {
        client: {
          actions: [() => 'wrong', () => 'export'],
        },
      },
    ]

    expect(() => {
      require('../../src/components/actions')
    }).toThrow()
  })
})
