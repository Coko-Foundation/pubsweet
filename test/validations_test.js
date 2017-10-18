const Fragment = require('../src/models/Fragment')
const validations = require('../src/models/validations')(require('config'))

describe('Validations export', function () {
  it('exports useable combined validations (static + configurable)', () => {
    expect(Object.keys(validations).sort()).toEqual(
      ['user', 'fragment', 'team', 'collection'].sort()
    )

    var fragment = new Fragment({
      title: 'Testing',
      fragmentType: 'blogpost',
      owners: ['d56153c3-0ddf-44fd-9bec-c4151329ef0a']
    })

    expect(fragment.validate()).toBe(true)

    var message

    try {
      fragment.type = undefined
      fragment.validate()
    } catch (error) {
      message = error.message
    }

    expect(message).toBeTruthy()
  })
})
