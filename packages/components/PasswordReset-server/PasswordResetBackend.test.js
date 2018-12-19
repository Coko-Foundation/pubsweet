process.env.SUPPRESS_NO_CONFIG_WARNING = true

const express = require('express')
const supertest = require('supertest')

// mocks
jest.mock('./transport', () => ({ sendMail: jest.fn() }))

const transport = require('./transport')
const component = require('.')

function makeApp(response) {
  const app = express()
  // mock DB
  app.locals.models = {
    User: {
      findByField: jest.fn(
        () =>
          response instanceof Error
            ? Promise.reject(response)
            : Promise.resolve(response),
      ),
    },
  }
  // register component
  component.server()(app)
  // create test wrapper
  return supertest(app)
}

describe('/api/password-reset route', () => {
  describe('initial validation', () => {
    it('errors if no username', () =>
      makeApp()
        .post('/api/password-reset')
        .send({})
        .expect(400, '{"error":"Username must be specified"}'))

    it('errors if no user', () =>
      makeApp(null)
        .post('/api/password-reset')
        .send({ username: 'hey' })
        .expect(400, '{"error":"User not found"}'))

    it('errors if DB call fails', () =>
      makeApp(new Error('Ops!'))
        .post('/api/password-reset')
        .send({ username: 'hey' })
        .expect(500))
  })

  describe('sending email', () => {
    it('sends email if no token and password', () => {
      const user = {
        username: 'hey',
        email: 'hey@here.com',
        save: jest.fn(),
      }
      return makeApp([user])
        .post('/api/password-reset')
        .send({ username: user.username })
        .expect(200)
        .then(() => {
          expect(user.passwordResetToken).toBeDefined()
          expect(user.passwordResetTimestamp).toBeDefined()
          expect(user.save).toHaveBeenCalled()
          expect(transport.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
              from: 'nobody@example.com',
              to: user.email,
              subject: 'Password reset',
              text: expect.stringContaining(
                `http://example.com/password-reset?username=${
                  user.username
                }&token=${user.passwordResetToken}`,
              ),
            }),
          )
        })
    })
  })

  describe('setting password', () => {
    it('errors if reset token does not match', () => {
      const user = {
        username: 'hey',
        passwordResetToken: '123',
      }
      return makeApp([user])
        .post('/api/password-reset')
        .send({ username: user.username, token: 'wrong', password: 'new pass' })
        .expect(400, '{"error":"invalid"}')
    })

    it('errors if reset timestamp is in the past', () => {
      const user = {
        username: 'hey',
        passwordResetToken: '123',
        passwordResetTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
      }
      return makeApp([user])
        .post('/api/password-reset')
        .send({
          username: user.username,
          token: user.passwordResetToken,
          password: 'new pass',
        })
        .expect(400, '{"error":"expired"}')
    })

    it('saves user if all valid', () => {
      const user = {
        username: 'hey',
        passwordResetToken: '123',
        passwordResetTimestamp: Date.now(),
        save: jest.fn(),
      }
      return makeApp([user])
        .post('/api/password-reset')
        .send({
          username: user.username,
          token: user.passwordResetToken,
          password: 'new pass',
        })
        .expect(200)
        .then(() => expect(user.save).toHaveBeenCalled())
    })
  })
})
