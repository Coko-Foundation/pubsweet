const fileUpload = require('express-fileupload')

const crypto = require('crypto')
const { promisify } = require('util')

const randomBytes = promisify(crypto.randomBytes)
const uniqueTokenGenerator = async () =>
  (await randomBytes(24)).toString('base64').replace(/\W/g, '')

const {
  jobs: { connectToJobQueue },
} = require('pubsweet-server')

module.exports = app => {
  app.post('/convertDocxToHTML', fileUpload(), async (req, res, next) => {
    const jobQueue = await connectToJobQueue()
    req.files.docx.data = req.files.docx.data.toString('base64')

    // Note: this is not an optimal pattern, see https://github.com/timgit/pg-boss/issues/108
    const uniqueToken = await uniqueTokenGenerator()
    const jobId = await jobQueue.publish(`xsweet-${uniqueToken}`, {
      docx: req.files.docx,
    })

    await jobQueue.onComplete(`xsweet-${uniqueToken}`, job => {
      if (job.data.request.id === jobId) {
        if (job.data.failed) {
          return res.status(500).send(`Job failed, ${JSON.stringify(job.data)}`)
        }

        return res.status(200).send(job.data.response.html)
      }
      return undefined
    })
  })
}
