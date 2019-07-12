const config = require('config')

Object.assign(config, {
  pubsweet: { components: [`${__dirname}/../mocks/component`] },
})

const getMigrationPaths = require('../../src/helpers/migrationPaths')
const createTables = require('../../src/commands/create-tables')
const getUmzug = require('../../src/helpers/umzug')

describe('create tables', () => {
  it('gets migration paths', () => {
    const paths = getMigrationPaths()
    expect(paths).toHaveLength(3)
    expect(paths[0]).toMatch(/server\/migrations$/)
    expect(paths[1]).toMatch(/db-manager\/test\/migrations$/)
    expect(paths[2]).toMatch(/db-manager\/test\/mocks\/component\/migrations$/)
  })

  it('runs migrations', async () => {
    await createTables()
    const { umzug, cleanup } = await getUmzug([])
    const executedMigrations = await umzug.executed()
    expect(executedMigrations.map(migration => migration.file)).toEqual([
      '0001-component.js',
      '0002-app.js',
      '1524494862-entities.sql',
    ])
    await cleanup()
  })

  it('does run them again', async () => {
    const { umzug, cleanup } = await getUmzug([])
    const pendingMigrations = await umzug.pending()
    expect(pendingMigrations).toEqual([])
    await cleanup()
  })
})
