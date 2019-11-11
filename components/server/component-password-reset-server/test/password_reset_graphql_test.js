// mocks
jest.mock('@pubsweet/component-send-email', () => ({ send: jest.fn() }))

const { send: sendMail } = require('@pubsweet/component-send-email')

process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/component-password-reset-server"
  ]
}}`

// ('@pubsweet/model-fragment')

const { model: User } = require('@pubsweet/model-user')

const { dbCleaner, api } = require('pubsweet-server/test')

const { fixtures } = require('@pubsweet/model-user/test')

describe('Password reset', () => {
  let user

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
  })

  describe('Email', () => {
    it('sends a password reset email', async () => {
      const { body } = await api.graphql.query(
        `mutation($username: String!) {
          sendPasswordResetEmail(username: $username)
        }`,
        {
          username: fixtures.user.username,
        },
      )

      expect(body.data.sendPasswordResetEmail).toBe(true)

      user = await User.query().findById(user.id)
      expect(user.passwordResetToken).toBeDefined()
      expect(user.passwordResetTimestamp).toBeDefined()
      expect(sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'nobody@example.com',
          to: user.email,
          subject: 'Password reset',
          text: expect.stringContaining(
            `http://example.com/password-reset?username=${user.username}&token=${user.passwordResetToken}`,
          ),
        }),
      )
    })
  })

  describe('Setting password', () => {
    it('errors if reset token does not match', async () => {
      await api.graphql.query(
        `mutation($username: String!) {
          sendPasswordResetEmail(username: $username)
        }`,
        {
          username: fixtures.user.username,
        },
      )

      const { body } = await api.graphql.query(
        `mutation($token: String!, $password: String!) {
          resetPassword(token: $token, password: $password)
        }`,
        {
          token: 'notthetoken',
          password: 'arealpassword',
        },
      )

      expect(body.errors[0].message).toMatch('Something went wrong!')
    })

    it('errors if reset timestamp is in the past', async () => {
      user.passwordResetToken = '123'
      const d = new Date()
      d.setFullYear(d.getFullYear() - 1)
      user.passwordResetTimestamp = d
      await user.save()

      const { body } = await api.graphql.query(
        `mutation($token: String!, $password: String!) {
          resetPassword(token: $token, password: $password)
        }`,
        {
          token: user.passwordResetToken,
          password: 'arealpassword',
        },
      )

      expect(body.errors[0].message).toMatch('token has expired')
    })

    // This is an integration test, checking the roundtrip.
    // Including getting the token from the email.
    it('saves user if all valid', async () => {
      sendMail.mockClear()
      // create the token
      await api.graphql.query(
        `mutation($username: String!) {
          sendPasswordResetEmail(username: $username)
        }`,
        {
          username: fixtures.user.username,
        },
      )

      // get the token from the email
      const token = sendMail.mock.calls[0][0].text.match(/token=([^"]*)/)[1]

      // reset the password
      const { body } = await api.graphql.query(
        `mutation($token: String!, $password: String!) {
          resetPassword(token: $token, password: $password)
        }`,
        {
          token,
          password: 'arealpassword',
        },
      )

      expect(body.data.resetPassword).toBe(user.id)

      // verify the reset password
      user = await User.query().findById(user.id)
      expect(await user.validPassword('arealpassword')).toBe(true)
    })
  })
})
