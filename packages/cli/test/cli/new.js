jest.mock('child_process', () => ({ spawnSync: jest.fn() }))
jest.mock('fs-extra', () => {
  const fs = require.requireActual('fs-extra')
  fs.removeSync = jest.fn(fs.removeSync)
  return fs
})

const path = require('path')
const fs = require('fs-extra')
const { getMockArgv } = require('../helpers/')
const runNew = require('../../cli/new')

const spawnSpy = require('child_process').spawnSync
const removeSpy = fs.removeSync

const appName = 'testapp'
const appPath = path.join(process.cwd(), appName)

describe('new', () => {
  it('spawns git and yarn child processes with correct arguments', async () => {
    await runNew(getMockArgv({args: appName}))
    const calls = spawnSpy.mock.calls
    expect(calls).toHaveLength(2)
    expect(calls[0][1][2]).toBe(appName)
    expect(calls[1][2].cwd).toBe(appPath)
  })

  it('will not overwrite dir without clobber passed', async () => {
    fs.ensureDirSync(path.join(appPath, 'block-write'))
    await runNew(getMockArgv({args: appName}))
    const calls = removeSpy.mock.calls
    expect(calls).toHaveLength(0)
    const notOverwritten = fs.existsSync(appPath)
    expect(notOverwritten).toBeTruthy()
    require.requireActual('fs-extra').removeSync(appPath)
  })

  it('will overwrite dir with clobber passed', async () => {
    fs.ensureDirSync(path.join(appPath, 'block-write'))
    await runNew(getMockArgv({args: appName, options: {clobber: true}}))
    const calls = removeSpy.mock.calls
    expect(calls[0][0]).toBe(appPath)
    require.requireActual('fs-extra').removeSync(appPath)
  })
})
