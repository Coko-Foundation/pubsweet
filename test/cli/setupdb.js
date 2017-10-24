jest.mock('child_process', () => ({ spawnSync: jest.fn() }))
jest.mock('@pubsweet/db-manager', () => ({ setupDb: jest.fn() }))

const { getMockArgv } = require('../helpers/')
const runSetupDb = require('../../cli/setupdb')
const setupDbSpy = require('@pubsweet/db-manager').setupDb

const dbOpts = {
  username: 'anotheruser',
  email: 'bar@example.com',
  password: '12345'
}

describe('setupdb', () => {
  it('calls dbManager.setupDb with correct arguments', async () => {
    await runSetupDb(getMockArgv({ options: dbOpts }))
    const expected = Object.assign({}, dbOpts, { clobber: false })
    expect(setupDbSpy.mock.calls[0][0]).toEqual(expected)
  })
})
