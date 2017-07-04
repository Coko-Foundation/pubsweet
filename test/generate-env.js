require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const fs = require('fs-extra')

process.env.NODE_ENV = 'test' // TODO: this shouldn't be needed

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

describe('generate-env', () => {
  beforeAll(async (done) => {
    try {
      await require('./helpers/working-dir')()
      await require('../src/generate-env')()
      done()
    } catch (e) {
      done.fail(e)
    }
  })

  it('only generates .env for the given environment', async () => {
    const envfiles = await fs.readdir(process.cwd())
    expect(envfiles).toContain('.env.test')
    expect(envfiles).not.toContain('.env.dev')
    expect(envfiles).not.toContain('.env.production')
  })

  it('configures PUBSWEET_SECRET', async () => {
    const envPath = path.join(process.cwd(), '.env.test')
    const data = await fs.readFile(envPath, 'utf-8')
    expect(data).toMatch(/PUBSWEET_SECRET=/)
  })
})
