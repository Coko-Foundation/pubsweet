const childProcess = require('child_process')

jest.mock('fs-extra', () => {
  const fs = require.requireActual('fs-extra')
  fs.writeJsonSync = jest.fn()
  fs.ensureFileSync = jest.fn()
  return fs
})
jest.mock('../../src/package-management/helpers/', () => {
  const helpers = require.requireActual('../../src/package-management/helpers/')
  helpers.getDepsFromPackageJson = jest.fn()
  return helpers
})

childProcess.spawnSync = jest.fn()
const spawnSpy = require('child_process').spawnSync

const fs = require('fs-extra')
const { getMockArgv } = require('../helpers/')
const runAdd = require('../../cli/add')

const readPkgSpy = require('../../src/package-management/helpers/')
  .getDepsFromPackageJson

const writeSpy = fs.writeJsonSync

describe('add', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('requires a component', async () => {
    await expect(runAdd(getMockArgv(''))).rejects.toBeInstanceOf(Error)
  })

  it('calls function to write new component into components.json with correct argument', async () => {
    const componentName = 'test-widget'
    const fullName = `pubsweet-component-${componentName}`
    readPkgSpy
      .mockImplementationOnce(() => ({}))
      .mockImplementationOnce(() => ({ [fullName]: 'version' }))
    await runAdd(getMockArgv({ args: componentName }))
    const { calls } = writeSpy.mock
    expect(calls).toHaveLength(1)
    expect(calls[0][1]).toContain(fullName)
  })

  it('spawns yarn child process with correct arguments', async () => {
    const componentName = 'test-widget'
    await runAdd(getMockArgv({ args: componentName }))
    const { calls } = spawnSpy.mock
    expect(calls).toHaveLength(1)
    expect(calls[0][1][1]).toBe(`pubsweet-component-${componentName}`)
  })
})
