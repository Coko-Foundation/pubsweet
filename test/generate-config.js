const generate = require('../src/generate-config')
const workingdir = require('./helpers/working_dir')
const expect = require('chai').expect
const fs = require('fs-extra')
const path = require('path')

describe.only('generate-config', () => {
  it('returns a promise', () => workingdir().then(
    dir => expect(generate()).to.be.a('promise'))
  )

  it('only generates config for the current NODE_ENV', () => {
    const env = process.env.NODE_ENV
    return workingdir().then(
      dir => generate().then(
        configpath => {
          const parsed = path.parse(configpath)
          expect(parsed.name).to.equal(env)

          const configfiles = fs.readdirSync(parsed.dir)
          expect(configfiles).to.include(`${env}.js`)
          expect(configfiles).to.not.include('dev.js')
          expect(configfiles).to.not.include('production.js')
        }
      )
    )
  })

  describe('generated config', () => {
    let configpath
    let config
    beforeAll(() => workingdir().then(generate).then(
      _configpath => {
        configpath = _configpath
        config = require(configpath)
      })
    )

    it('configures pubsweet-server',
      () => {
        expect(config).to.include.keys('pubsweet-server')
      }
    )

    it('configures pubsweet-client',
      () => {
        expect(config).to.include.keys('pubsweet-client')
      }
    )

    it('configures pubsweet',
      () => {
        expect(config).to.include.keys('pubsweet')
      }
    )

    it('configures authsome',
      () => {
        expect(config).to.include.keys('authsome')
      }
    )

    describe('authsome config', () => {
      it('configures teams',
        () => {
          expect(config.authsome).to.include.keys('teams')
        }
      )

      it('configures mode',
        () => {
          expect(config.authsome).to.include.keys('mode')
        }
      )
    })

    it('does not clobber existing config', () => {
      const statbefore = fs.statSync(configpath)
      return generate().then(
        _configpath => {
          const statafter = fs.statSync(configpath)
          expect(statbefore.mtime.getTime()).to.equal(statafter.mtime.getTime())
        }
      )
    })
  })
})
