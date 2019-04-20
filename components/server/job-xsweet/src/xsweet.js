const tmp = require('tmp-promise')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// encode file to base64
const base64EncodeFile = path => fs.readFileSync(path).toString('base64')

const imagesToBase64 = html => {
  // create array of the img elements in the HTML file
  const images = html.match(/<img src="file:.*?">/g)
  // create corresponding array of img paths
  const paths = images.map(el => el.slice(15, el.length - 2))

  // swap out img path elements with inline base64 picture elements
  paths.forEach((path, index) => {
    const ext = path.slice(path.lastIndexOf('.') + 1, path.length)
    const imageInBase64 = `<img src="data:image/${ext};base64,${base64EncodeFile(
      path,
    )}" />`
    html = html.replace(images[index], imageInBase64)
  })

  return html
}

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

  let processedHtml
  try {
    processedHtml = imagesToBase64(html)
  } catch (e) {
    processedHtml = html
  }
  // console.log(html)

  await cleanup()

  return { html: processedHtml }
}

const handleJobs = async () => {
  const {
    jobs: { connectToJobQueue },
  } = require('pubsweet-server')

  const jobQueue = await connectToJobQueue()

  // Subscribe to the job queue with an async handler
  await jobQueue.subscribe('xsweet-*', xsweetHandler)
}

handleJobs()
