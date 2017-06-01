const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

process.env.NODE_ENV = 'test'

const fs = require('fs-extra')

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

  it('generates .env for all environments', async () => {
    const envfiles = await fs.readdir(process.cwd())
    expect(envfiles).toContain('.env.test')
    expect(envfiles).toContain('.env.dev')
    expect(envfiles).toContain('.env.production')
  })

  it('configures PUBSWEET_SECRET', async () => {
    const envPath = path.join(process.cwd(), '.env.' + process.env.NODE_ENV)
    const data = await fs.readFile(envPath, 'utf-8')
    expect(data).toMatch(/PUBSWEET_SECRET=/)
  })
})
