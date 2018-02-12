process.env.SUPPRESS_NO_CONFIG_WARNING = true

const express = require('express')
const supertest = require('supertest')
const bodyParser = require('body-parser')
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy

jest.mock('./transporter', () => ({ sendMail: jest.fn() }))
const transporter = require('./transporter')

const component = require('..')

function makeApp(response) {
  const app = express()
  app.use(bodyParser.json())
  const user = {
    type: 'user',
    username: 'testuser',
    email: 'test@example.com',
    password: 'test',
  }
  app.use(passport.initialize())
  passport.use(
    'bearer',
    new BearerStrategy((token, done) => done(null, user, { scope: 'all' })),
  )
  app.locals.passport = passport
  // register component
  component.server()(app)
  // create test wrapper
  return supertest(app)
}

const emailUrl = '/api/email'
describe('/api/email route', () => {
  describe('initial validation', () => {
    it('errors if no params are given', () =>
      makeApp()
        .post(emailUrl)
        .set('Authorization', 'Bearer 123')
        .send({})
        .expect(400, '{"error":"all parameters are required"}'))

    it('errors if some params are missing', () =>
      makeApp()
        .post(emailUrl)
        .set('Authorization', 'Bearer 123')
        .send({
          email: 'test@email.com',
          subject: 'test subject',
        })
        .expect(400, '{"error":"all parameters are required"}'))
  })

  describe('sending email', () => {
    it('sends email if all parameters are correct', () => {
      const body = {
        email: 'test@email.com',
        emailSubject: 'test subject',
        textBody: 'this is a text',
        htmlBody: '<p>this is a text</p>',
      }
      return makeApp()
        .post(emailUrl)
        .set('Authorization', 'Bearer 123')
        .send(body)
        .expect(204)
        .then(() => {
          expect(transporter.sendMail).toBeCalledWith(
            {
              from: 'test_sender@domain.com',
              html: body.htmlBody,
              subject: body.emailSubject,
              text: body.textBody,
              to: body.email,
            },
            expect.any(Function),
          )
        })
    })
  })
})
