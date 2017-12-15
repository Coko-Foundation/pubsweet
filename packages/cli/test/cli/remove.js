jest.mock('child_process', () => ({ spawnSync: jest.fn() }))
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

const path = require('path')
const fs = require('fs-extra')
const { getMockArgv } = require('../helpers/')
const runRemove = require('../../cli/remove')

const spawnSpy = require('child_process').spawnSync
const readPkgSpy = require('../../src/package-management/helpers/')
  .getDepsFromPackageJson

const writeSpy = fs.writeJsonSync

describe('remove', () => {
  beforeAll(() => {
    process.chdir(
      path.join(__dirname, '..', '..', 'node_modules', '@pubsweet', 'starter'),
    )
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    process.chdir(path.join(__dirname, '..', '..'))
  })

  it('requires a component', async () => {
    await expect(runRemove(getMockArgv(''))).rejects.toBeInstanceOf(Error)
  })

  it('removes component from components.json', async () => {
    const componentName = 'blog'
    const fullName = `pubsweet-component-${componentName}`
    readPkgSpy
      .mockImplementationOnce(() => ({ [fullName]: 'version' }))
      .mockImplementationOnce(() => ({}))
    await runRemove(getMockArgv({ args: componentName }))
    const calls = writeSpy.mock.calls
    expect(calls).toHaveLength(1)
    expect(calls[0][1]).not.toContain(fullName)
  })

  it('spawns yarn child process with correct arguments', async () => {
    const componentName = 'test-widget'
    await runRemove(getMockArgv({ args: componentName }))
    const calls = spawnSpy.mock.calls
    expect(calls).toHaveLength(1)
    expect(calls[0][1][1]).toBe(`pubsweet-component-${componentName}`)
  })
})
