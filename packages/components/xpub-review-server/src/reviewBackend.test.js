process.env.SUPPRESS_NO_CONFIG_WARNING = true
process.env.NODE_CONFIG = '{"mailer":{"from":"sender@example.com"}}'

const express = require('express')
const supertest = require('supertest')
const bodyParser = require('body-parser')

// mocks
jest.mock('@pubsweet/component-send-email', () => ({
  send: jest.fn().mockImplementation(() => Promise.resolve({})),
}))
jest.mock('pubsweet-server/src/models/User', () => ({
  find: jest.fn(() => ({ email: 'author@example.org' })),
}))
jest.mock('pubsweet-server/src/models/Fragment', () => ({
  find: jest.fn(() => ({
    version: 1,
    owners: [{}],
    metadata: {
      title: 'title',
      abstract: 'abstract',
    },
    updateProperties(update) {
      Object.assign(this, update)
    },
    save: () => {},
  })),
}))
jest.mock('pubsweet-server/src/models/Collection', () => ({
  find: jest.fn(() => ({
    updateProperties: () => ({}),
    reviewers: [
      {
        user: 1,
      },
    ],
    save: () => {},
  })),
}))
jest.mock('pubsweet-server/src/helpers/authsome', () => ({
  can: jest.fn(() => true),
}))

jest.mock('passport', () => ({
  authenticate: jest.fn((AuthBear, data) =>
    jest.fn((req, res, next) => next()),
  ),
}))

const authsome = require('pubsweet-server/src/helpers/authsome')
const transport = require('@pubsweet/component-send-email')
const component = require('./reviewBackend')

function makeApp() {
  const app = express()
  app.use(bodyParser.json())
  component(app)
  return supertest(app)
}

describe('/api/make-decision route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('sends email on acceptance', async () => {
    const app = makeApp()
    const response = await app.patch('/api/make-decision').send({
      decision: { recommendation: 'accept', note: { content: 'blah blah' } },
      versionId: 1,
      projectId: 2,
    })
    expect(response.body.version).toBeDefined()
    expect(response.body.project).toBeDefined()
    expect(response.body.nextVersion).not.toBeDefined()
    expect(transport.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'sender@example.com',
        to: ['author@example.org'],
        subject: 'Decision made',
      }),
    )
  })

  it('rejects if not authorised', async () => {
    authsome.can.mockReturnValue(false)
    const app = makeApp()
    const response = await app.patch('/api/make-decision').send({
      decision: { recommendation: 'accept', note: { content: 'blah blah' } },
      versionId: 1,
      projectId: 2,
    })
    expect(response.status).toBe(403)
    expect(transport.send).not.toHaveBeenCalled()
  })
})

describe('/api/make-invitation route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('sends invitation email', async () => {
    authsome.can.mockReturnValue(true)
    const app = makeApp()
    const response = await app.patch('/api/make-invitation').send({
      versionId: '1',
      projectId: '2',
      reviewerId: 1,
      reviewers: [
        {
          events: {
            invited: 'Mon Apr 02 2018 14:58:06 GMT+0300 (EEST)',
          },
          email: 'author@example.org',
          status: 'invited',
        },
      ],
    })

    expect(response.body.version.reviewers).toBeDefined()
    expect(transport.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'sender@example.com',
        to: 'author@example.org',
        subject: 'Review Invitation',
        html:
          "<p>title</p><p>abstract</p><p><a href='http://example.com'>Click here to navigate to the Dashboard</a></p>",
      }),
    )
  })

  it('rejects if not authorised', async () => {
    authsome.can.mockReturnValue(false)
    const app = makeApp()
    const response = await app.patch('/api/make-invitation').send({
      versionId: '1',
      projectId: '2',
      reviewerId: 1,
      reviewers: [
        {
          events: {
            invited: 'Mon Apr 02 2018 14:58:06 GMT+0300 (EEST)',
          },
          email: 'author@example.org',
          status: 'invited',
        },
      ],
    })

    expect(response.status).toBe(403)
    expect(transport.send).not.toHaveBeenCalled()
  })
})

describe('/api/make-invitation route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('sends invitation email', async () => {
    authsome.can.mockReturnValue(true)
    const app = makeApp()
    const response = await app.patch('/api/make-invitation').send({
      versionId: '1',
      projectId: '2',
      reviewers: [
        {
          events: {
            invited: 'Mon Apr 02 2018 14:58:06 GMT+0300 (EEST)',
          },
          email: 'author@example.org',
          status: 'invited',
        },
      ],
    })
    expect(response.body.version.reviewers).toBeDefined()
    expect(transport.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'sender@example.com',
        to: 'author@example.org',
        subject: 'Review Invitation',
        html:
          "<p>title</p><p>abstract</p><p>Click <a href='http://example.com'>here</a> to navigate to the Dashboard</p>",
      }),
    )
  })

  it('rejects if not authorised', async () => {
    authsome.can.mockReturnValue(false)
    const app = makeApp()
    const response = await app.patch('/api/make-invitation').send({
      versionId: '1',
      projectId: '2',
      reviewers: [
        {
          events: {
            invited: 'Mon Apr 02 2018 14:58:06 GMT+0300 (EEST)',
          },
          email: 'author@example.org',
          status: 'invited',
        },
      ],
    })
    expect(response.status).toBe(403)
    expect(transport.sendMail).not.toHaveBeenCalled()
  })
})
