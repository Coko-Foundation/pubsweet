require('app-module-path').addPath(__dirname + '/..')

const generate = require('../src/generate-env')
const workingdir = require('./helpers/working_dir')
const expect = require('chai').expect
const fs = require('fs-extra')
const path = require('path')

describe('generate-env', () => {
  it('returns a promise', () => workingdir().then(
    () => expect(generate()).to.be.a('promise'))
  )

  it('only generates .env for the current NODE_ENV', () => {
    const env = process.env.NODE_ENV

    return workingdir().then(
      () => generate().then(
        envpath => {
          const parsed = path.parse(envpath)
          expect(parsed.ext).to.equal(`.${env}`)

          const envfiles = fs.readdirSync(parsed.dir)
          expect(envfiles).to.include(`.env.${env}`)
          expect(envfiles).to.not.include('.env.dev')
          expect(envfiles).to.not.include('.env.production')
        }
      )
    )
  })

  describe('generated env', () => {
    let env
    beforeAll(() => workingdir().then(generate).then(
      envpath => {
        env = fs.readFileSync(envpath)
      })
    )

    it('configures PUBSWEET_SECRET',
      () => {
        expect(env).to.match(/PUBSWEET_SECRET=/)
      }
    )
  })
})
