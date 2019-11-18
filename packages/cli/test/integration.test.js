/* eslint-disable no-console */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000000

const path = require('path')
const fs = require('fs-extra')
const { runCommandSync, runCommandAsync } = require('./helpers/')
const fetch = require('isomorphic-fetch')
const os = require('os')

const appName = `pubsweet-test-${Math.floor(Math.random() * 99999)}`
const tempDir = os.tmpdir()
const appPath = path.join(tempDir, appName)

const nodeConfig = {
  'pubsweet-server': {
    db: { database: global.__testDbName },
    uploads: path.join(appPath, 'uploads'),
  },
  authsome: {
    mode: 'authsome/src/modes/blog',
  },
  pubsweet: {
    components: [
      '@pubsweet/model-user',
      '@pubsweet/model-collection',
      '@pubsweet/model-team',
      '@pubsweet/model-fragment',
    ],
  },
  'pubsweet-client': {
    theme: 'PepperTheme',
  },
}

const setupDbOptions = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345678',
}

/* These tests run "pubsweet" commands as child processes with no mocking */
/* They perform a full installation cycle, including multiple yarn commands */

describe('CLI: integration test', () => {
  afterAll(() => fs.removeSync(appPath))

  describe('new', () => {
    it('will not overwrite non-empty dir', () => {
      fs.ensureDirSync(path.join(appPath, 'blocking-dir'))
      const { stdout, stderr } = runCommandSync({
        args: `new ${appName}`,
        cwd: tempDir,
      })
      console.log(stderr, stdout)
      expect(stderr).toContain(
        `destination path '${appName}' already exists and is not an empty directory`,
      )
      fs.removeSync(appPath)
    })

    it('clones repo, installs dependencies and generates secret', () => {
      runCommandSync({ args: `new ${appName}`, cwd: tempDir, stdio: 'inherit' })
      expect(fs.readdirSync(appPath)).toContain('node_modules')
      expect(fs.readdirSync(path.join(appPath, 'config'))).toContain(
        'local.json',
      )
    })
  })

  describe('setupdb', () => {
    it('creates tables', () => {
      const { stdout, stderr } = runCommandSync({
        args: 'setupdb',
        options: setupDbOptions,
        stdio: 'pipe',
        cwd: appPath,
        nodeConfig,
      })

      console.log(stdout, stderr)
      expect(stdout).toContain('Finished')
    })
  })

  describe('build', () => {
    const buildDir = path.join(appPath, '_build')

    it('outputs static assets to _build directory', () => {
      const { stdout, stderr } = runCommandSync({
        args: 'build',
        stdio: 'inherit',
        cwd: appPath,
        nodeConfig,
      })
      console.log(stderr, stdout)

      expect(fs.existsSync(path.join(buildDir, 'assets', 'bundle.js'))).toBe(
        true,
      )
      fs.removeSync(buildDir)
    })
  })

  describe('server', () => {
    it('starts an app', done => {
      const app = runCommandAsync({
        args: 'server',
        cwd: appPath,
        stdio: 'pipe',
        nodeConfig,
      })

      app.stderr.on('data', data => {
        console.log('stderr:', data.toString())
      })

      app.stdout.on('data', async data => {
        console.log('stdout:', data.toString())
        if (data.toString().includes('App is listening')) {
          const result = await fetch('http://localhost:3000')
          expect(result.status).toBe(200)
          console.log('Killing the app')
          process.kill(-app.pid)
        }
      })

      app.on('close', (code, signal) => {
        console.log(`App killed ${signal}`)
        done()
      })
    })
  })
})
