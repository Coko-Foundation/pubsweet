import makeConfig from '.'

describe('makeConfig', () => {
  it('turns an array of features into a config', () => {
    const config = makeConfig([])

    expect(config.schema).toBeTruthy()
    expect(config.menu).toBeTruthy()
    expect(config.plugins).toBeTruthy()
  })

  it('adds marks', () => {
    const features = [
      'bold',
      'italic',
      'underline',
      'link',
      'smallcaps',
      'not real',
      'superscript',
      'subscript',
    ]
    const config = makeConfig(features)
    const realFeatures = features.filter(f => f !== 'not real')

    expect(Object.keys(config.schema.marks)).toEqual(realFeatures)
  })

  it('adds nodes', () => {
    const config = makeConfig(['bold', 'heading'])

    expect(Object.keys(config.schema.nodes)).toContain('heading')
  })
})
