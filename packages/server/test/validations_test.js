const Fragment = require('../src/models/Fragment')
const config = require('config')

const appValidations = require(config.validations)
const validations = require('../src/models/validations')(appValidations)

describe('Validations export', () => {
  it('has validations for each type', () => {
    expect(Object.keys(validations).sort()).toEqual(['collection', 'fragment'])
  })

  it('allows fragment with required fields', () => {
    const fragment = new Fragment({
      // ID is generated on save so provide it explicitly here
      id: '06521f58-9740-4f38-bd25-f00e528cbb2d',
      title: 'Testing',
      fragmentType: 'blogpost',
    })

    expect(fragment.validate()).toBe(true)
  })

  it('rejects fragment with missing type', () => {
    const fragment = new Fragment({
      id: '06521f58-9740-4f38-bd25-f00e528cbb2d',
      title: 'Testing',
    })
    fragment.type = undefined

    expect(() => fragment.validate()).toThrow('"type" is required')
  })
})
