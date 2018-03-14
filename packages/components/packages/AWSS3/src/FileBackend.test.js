process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')

const zipHandler = require('./routeHandlers/zipFiles')

describe('ValidateFile for multer fileFilter', () => {
  it('should return TRUE when fileType is supplementary', () => {
    const validateFile = require('./middeware/upload').validateFile(
      ...buildValidateFileParams('supplementary', 'image/png'),
    )
    expect(validateFile).toBe(true)
  })
  it('should return TRUE when fileType is manuscripts or coverLetter and the file is either Word Doc or PDF', () => {
    const randFileType = getRandValueFromArray(['manuscripts', 'coverLetter'])
    const randMimeType = getRandValueFromArray([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ])

    const validateFile = require('./middeware/upload').validateFile(
      ...buildValidateFileParams(randFileType, randMimeType),
    )
    expect(validateFile).toBe(true)
  })
  it('should return FALSE when fileType is manuscripts or coverLetter and the file is neither Word Doc or PDF', () => {
    const randFileType = getRandValueFromArray(['manuscripts', 'coverLetter'])
    const randMimeType = getRandValueFromArray([
      'text/plain',
      'text/html',
      'image/jpeg',
      'image/png',
    ])

    const validateFile = require('./middeware/upload').validateFile(
      ...buildValidateFileParams(randFileType, randMimeType),
    )
    expect(validateFile).toBe(false)
  })
})

describe('Upload file route handler', () => {
  it('should return success when the file passed validation', async () => {
    const file = {
      key: '123abc',
      originalname: 'file.txt',
      size: 128,
    }
    const req = httpMocks.createRequest({
      file,
    })
    const res = httpMocks.createResponse()
    await require('./routeHandlers/postFile')(req, res)
    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.id).toEqual(file.key)
    expect(data.name).toEqual(file.originalname)
    expect(data.size).toEqual(file.size)
  })
  it('should return an error when the file failed validation', async () => {
    const req = httpMocks.createRequest({
      fileValidationError: 'Only Word documents and PDFs are allowed',
    })
    const res = httpMocks.createResponse()
    await require('./routeHandlers/postFile')(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(req.fileValidationError)
  })
})

describe('Zip files endpoint', () => {
  const testObject = {
    Key: 'KeyToMyHeart',
    Body: Buffer.alloc(10),
    Metadata: {
      filetype: 'manuscripts',
      filename: 'test.txt',
    },
  }
  const mockBucket = {
    RandomKey: {
      Contents: [testObject, testObject],
    },
  }

  const s3 = {}
  const mocks = {}
  let mockArchiver = null
  const s3Config = {
    bucket: 'TestBucket',
  }
  beforeAll(() => {
    s3.getObject = jest.fn((params, cb) => {
      cb(null, testObject)
    })

    s3.listObjects = jest.fn((params, cb) => {
      cb(null, mockBucket[params.Prefix])
    })
    mocks.pipe = jest.fn()
    mocks.append = jest.fn()
    mocks.finalize = jest.fn()
    mocks.attachment = jest.fn()

    mockArchiver = jest.fn(p => ({
      pipe: mocks.pipe,
      append: mocks.append,
      finalize: mocks.finalize,
    }))
  })
  afterEach(() => {
    s3.getObject.mockClear()
    s3.listObjects.mockClear()
    mocks.pipe.mockClear()
    mocks.append.mockClear()
    mocks.attachment.mockClear()
  })
  it(`no zipping if no files found`, async () => {
    const zipFiles = zipHandler(s3, s3Config, mockArchiver)
    const request = httpMocks.createRequest({
      method: 'GET',
      params: {
        fragmentId: 'NotFoundKey',
      },
    })
    const response = httpMocks.createResponse()
    response.attachment = mocks.attachment

    await zipFiles(request, response)

    expect(s3.listObjects.mock.calls).toHaveLength(1)
    expect(s3.getObject.mock.calls).toHaveLength(0)
    expect(mocks.attachment.mock.calls).toHaveLength(0)
    expect(mocks.append.mock.calls).toHaveLength(0)
    expect(mocks.pipe.mock.calls).toHaveLength(0)

    const responseData = JSON.parse(response._getData())

    expect(responseData.message).toEqual(
      `No files found for the requested manuscript.`,
    )
    expect(response._getStatusCode()).toEqual(204)
  })
  it('zips all the files', async () => {
    const zipFiles = zipHandler(s3, s3Config, mockArchiver)

    const request = httpMocks.createRequest({
      method: 'GET',
      params: {
        fragmentId: 'RandomKey',
      },
    })
    const response = httpMocks.createResponse()
    response.attachment = mocks.attachment

    await zipFiles(request, response)

    expect(s3.listObjects.mock.calls).toHaveLength(1)
    expect(s3.getObject.mock.calls).toHaveLength(2)
    expect(mocks.attachment.mock.calls).toHaveLength(1)
    expect(mocks.attachment.mock.calls[0][0]).toEqual('RandomKey-archive.zip')
    expect(mocks.append.mock.calls).toHaveLength(2)
    expect(mocks.pipe.mock.calls).toHaveLength(1)
    expect(response._getStatusCode()).toEqual(200)
  })
})

const getRandValueFromArray = arr => arr[Math.floor(Math.random() * arr.length)]

const buildValidateFileParams = (fileType, mimetype) => {
  const req = {
    body: {
      fileType,
    },
  }
  const file = {
    mimetype,
  }
  const cb = (p1, p2) => {
    if (p2 === true) return true
    return false
  }

  return [req, file, cb]
}
