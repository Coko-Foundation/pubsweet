jest.mock('child_process', () => ({ spawnSync: jest.fn() }))
jest.mock('@pubsweet/db-manager', () => ({ addUser: jest.fn() }))

const { getMockArgv } = require('../helpers/')
const runAddUser = require('../../cli/adduser')
const addUserSpy = require('@pubsweet/db-manager').addUser

const user = {
  username: 'anotheruser',
  email: 'bar@example.com',
  password: '12345',
  admin: true,
}

describe('adduser', () => {
  it('calls dbManager.addUser with correct arguments', async () => {
    await runAddUser(getMockArgv({ options: user }))
    expect(addUserSpy.mock.calls[0][0]).toEqual(user)
  })
})
