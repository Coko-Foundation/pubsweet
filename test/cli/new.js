/*
const formatArgs = require('../helpers/format-args')
const spawn = require('child-process-promise').spawn

// const appName = 'testapp'

const runCommand = async (argsList, options) => {
  const optsList = formatArgs(options)
  return spawn('pubsweet', argsList.concat[optsList], {
    cwd: process.cwd(),
    stdio: 'inherit'
  })
}

describe('CLI: pubsweet new', () => {
  it('requires an app name', async () => {
    try {
      await runCommand('new', {})
    } catch (e) {
      console.log(e)
    }
  })
  it('rejects if app exists', async () => {
    fs.writeFileSync(path.join(dir, 'file'), '')

    await expect(checknoapp({appPath: dir})).rejects
      .toBeInstanceOf(Error)
  })

  it('resolves if no app exists', async () => {
    const dir = '/__this_does_not_exist_probably__'
    await checknoapp({appPath: dir})
  })

  it('resolves if clobber + app exists', async () => {
    const dir = await workingdir()
    await checknoapp({appPath: dir, override: { clobber: true }})
  })
})
  */
