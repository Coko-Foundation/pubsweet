require('./helpers/fix-stdio')
require('./helpers/debug-exit')

describe('load-config', () => {
  it('sets the NODE_CONFIG_DIR', () => {
    const dir = 'some_example_dir'
    require('../src/load-config')(dir)
    expect(process.env.NODE_CONFIG_DIR).toBe(dir)
  })
})
