jest.mock('child-process-promise', () => ({ spawn: jest.fn() }))
jest.mock('@pubsweet/db-manager', () => ({ setupDb: jest.fn() }))

const path = require('path')
const fs = require('fs-extra')
const { getMockArgv } = require('../helpers/')
const runSetupDb = require('../../cli/setupdb')
const setupDbSpy = require('@pubsweet/db-manager').setupDb

const dbOpts = {
  username: 'anotheruser',
  email: 'bar@example.com',
  password: '12345',
  collection: 'entries'
}

describe('setupdb', () => {
  it('calls dbManager.setupDb with correct arguments', async () => {
    await runSetupDb(getMockArgv({ options: dbOpts }))
    expect(setupDbSpy.mock.calls[0][0]).toEqual(dbOpts)
  })
})
