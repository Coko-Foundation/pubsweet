const fileUpload = require('express-fileupload')

const {
  jobs: { connectToJobQueue },
} = require('pubsweet-server')

module.exports = app => {
  app.post('/convertDocxToHTML', fileUpload(), async (req, res, next) => {
    const jobQueue = await connectToJobQueue()
    req.files.docx.data = req.files.docx.data.toString('base64')
    const jobId = await jobQueue.publish('xsweet', { docx: req.files.docx })

    await jobQueue.onComplete('xsweet', job => {
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
