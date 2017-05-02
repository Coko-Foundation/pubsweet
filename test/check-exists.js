const checkexists = require('../src/check-exists')
const workingdir = require('./helpers/working_dir')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))
const fs = require('fs-extra')

describe.only('check-exists', () => {
  it('rejects if no app dir exists', () => expect(
      checkexists('/__this_does_not_exist_probably__')()
    ).to.be.rejectedWith()
  )

  it('resolves if app dir exists', () => {
    return workingdir().then(
      dir => {
        const dbdir = require('../src/db-path')(dir)
        fs.mkdirsSync(dbdir)
        return expect(
          checkexists(dir)()
        ).to.eventually.equal()
      }
    )
  })
})
