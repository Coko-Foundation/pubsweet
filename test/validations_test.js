const Fragment = require('../src/models/Fragment')
const validations = require('../src/models/validations')(require('config'))

describe('Validations export', function () {
  it('has validations for each type', () => {
    expect(Object.keys(validations).sort()).toEqual(['collection', 'fragment', 'team', 'user'])
  })

  it('allows fragment with required fields', () => {
    const fragment = new Fragment({
      title: 'Testing',
      fragmentType: 'blogpost'
    })

    expect(fragment.validate()).toBe(true)
  })

  it('rejects fragment with missing type', () => {
    const fragment = new Fragment({
      title: 'Testing'
    })
    fragment.type = undefined

    expect(() => fragment.validate()).toThrow('"type" is required')
  })
})
