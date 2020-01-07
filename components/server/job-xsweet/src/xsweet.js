const tmp = require('tmp-promise')
const fs = require('fs')
const path = require('path')
const { execSync, execFileSync } = require('child_process')
const logger = require('@pubsweet/logger')
const { pubsubManager } = require('pubsweet-server')

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

const xsweetHandler = enablePubsub => async job => {
  try {
    let pubsub
    if (enablePubsub) {
      logger.info(job.data.pubsubChannel, 'has started.')
      pubsub = await pubsubManager.getPubsub()
      pubsub.publish(job.data.pubsubChannel, {
        docxToHTMLJob: {
          status: 'DOCX to HTML conversion started',
        },
      })
    }

    const buf = Buffer.from(job.data.docx.data, 'base64')

    const { path: tmpDir, cleanup } = await tmp.dir({
      prefix: '_conversion-',
      unsafeCleanup: true,
      dir: process.cwd(),
    })

    fs.writeFileSync(path.join(tmpDir, job.data.docx.name), buf)

    if (enablePubsub) {
      pubsub.publish(job.data.pubsubChannel, {
        docxToHTMLJob: {
          status: 'Unzipping DOCX document',
        },
      })
    }

    execFileSync('unzip', [
      '-o',
      `${tmpDir}/${job.data.docx.name}`,
      '-d',
      tmpDir,
    ])

    if (enablePubsub) {
      pubsub.publish(job.data.pubsubChannel, {
        docxToHTMLJob: { status: 'Converting DOCX using XSweet' },
      })
    }

    execSync(`bash ${path.resolve(__dirname, 'execute_chain.sh')} ${tmpDir}`)
    const html = fs.readFileSync(
      path.join(tmpDir, 'outputs', 'HTML5.html'),
      'utf8',
    )

    let processedHtml
    try {
      processedHtml = imagesToBase64(html)
    } catch (e) {
      processedHtml = html
    }

    await cleanup()

    if (enablePubsub) {
      logger.info(job.data.pubsubChannel, 'has completed.')
      pubsub.publish(job.data.pubsubChannel, {
        docxToHTMLJob: { status: 'Conversion complete' },
      })
    }
    return { html: processedHtml }
  } catch (e) {
    // eslint-disable-next-line
    console.log(e)
    if (enablePubsub) {
      const pubsub = await pubsubManager.getPubsub()
      pubsub.publish(job.data.pubsubChannel, {
        docxToHTMLJob: { status: 'Conversion error' },
      })
    }

    throw new Error('Conversion error')
  }
}

const handleJobs = async () => {
  const {
    jobs: { connectToJobQueue },
  } = require('pubsweet-server')

  const jobQueue = await connectToJobQueue()

  // Subscribe to the job queue with an async handler
  await jobQueue.subscribe('xsweet-*', xsweetHandler(false))
  await jobQueue.subscribe('xsweetGraphQL', xsweetHandler(true))
}

handleJobs()
