const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))
const fs = require('fs-extra')
const path = require('path')
const workingdir = require('./helpers/working_dir')
const checkdb = require('../src/check-db')
const dbPath = require('../src/db-path')

describe.only('check-db', () => {
  let env
  beforeAll(() => {
    env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
  })

  afterAll(() => {
    process.env.NODE_ENV = env
  })

  it('rejects if no db exists', () => {
    return workingdir().then(
      dir => expect(
        checkdb(dir)
      ).to.be.rejectedWith()
    )
  })

  it('resolves if db exists', () => {
    return workingdir().then(
      dir => {
        const dbdir = dbPath(dir)
        fs.mkdirsSync(dbdir)
        fs.writeFileSync(path.join(dbdir, 'CURRENT'), '')
        return expect(
          checkdb(dir)
        ).to.eventually.equal()
      }
    )
  })
})
