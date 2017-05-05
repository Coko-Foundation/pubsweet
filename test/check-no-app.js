const checknoapp = require('../src/check-no-app')
const workingdir = require('./helpers/working_dir')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))
const fs = require('fs')
const path = require('path')

describe.only('check-no-app', () => {
  it('rejects if app exists', () => {
    return workingdir().then(
      dir => {
        fs.writeFileSync(path.join(dir, 'file'), '')
        return expect(
          checknoapp({ appPath: dir })()
        ).to.be.rejected
      }
    )
  })

  it('resolves if no app exists', () => expect(
      checknoapp({ appPath: '/__this_does_not_exist_probably__' })()
    ).to.be.fulfilled
  )

  it('resolves if clobber + app exists', () => {
    return workingdir().then(
      dir => expect(
        checknoapp({ appPath: dir, clobber: true })()
      ).to.be.fulfilled
    )
  })
})
