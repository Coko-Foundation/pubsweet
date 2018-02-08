process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')

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
