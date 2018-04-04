const { runCommandSync } = require('../helpers/')

describe('unknownCmd', () => {
  it('displays help on unknown command', () => {
    const { stdout } = runCommandSync({
      args: 'nonsense',
    })
    expect(stdout).toContain('-V, --version  output the version number')
  })
})
