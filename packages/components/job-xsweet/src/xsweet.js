const tmp = require('tmp-promise')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const xsweetHandler = async job => {
  // console.log('processing job', job.data.docx)
  const buf = Buffer.from(job.data.docx.data, 'base64')

  const { path: tmpDir, cleanup } = await tmp.dir({
    prefix: '_conversion-',
    unsafeCleanup: true,
    dir: process.cwd(),
  })

  // console.log('Write the buffer to a temporary file')
  fs.writeFileSync(path.join(tmpDir, job.data.docx.name), buf)

  // console.log('Unzip that docx')
  execSync(`unzip -o ${tmpDir}/${job.data.docx.name} -d ${tmpDir}`)

  // console.log('Convert using a series of Saxon/XSLT steps')
  execSync(`bash ${path.resolve(__dirname, 'execute_chain.sh')} ${tmpDir}`)

  // console.log('Return the HTML5 output')
  const html = fs.readFileSync(
    path.join(tmpDir, 'outputs', '16HTML5.html'),
    'utf8',
  )
  // console.log(html)

  await cleanup()

  return { html }
}

const handleJobs = async () => {
  const {
    jobs: { connectToJobQueue },
  } = require('pubsweet-server')

  const jobQueue = await connectToJobQueue()

  const queueName = 'xsweet'

  // Subscribe to the job queue with an async handler
  await jobQueue.subscribe(queueName, xsweetHandler)
}

handleJobs()
