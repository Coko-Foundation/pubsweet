const config = require('config')

Object.assign(config, {
  pubsweet: {
    components: [`${__dirname}/../mocks/componentWithBrokenMigration`],
  },
})

const migrate = require('../../src/commands/migrate')

describe('broken migrations', () => {
  it('throws an error when they run', async () => {
    await expect(migrate()).rejects.toThrow(
      'CREATE A TABLE WITH BROKEN MIGRATION; - syntax error at or near "A"',
    )
  })
})
