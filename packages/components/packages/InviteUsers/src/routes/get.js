const helpers = require('../helpers/helpers')
const pick = require('lodash/pick')

module.exports = models => async (req, res) => {
  const { email, token } = req.query
  if (!helpers.checkForUndefinedParams(email, token)) {
    res.status(400).json({ error: 'missing required params' })
    return
  }

  const validateResponse = await helpers.validateEmailAndToken(
    email,
    token,
    models.User,
  )
  if (validateResponse.success === false) {
    res
      .status(validateResponse.status)
      .json({ error: validateResponse.message })
    return
  }

  const resBody = pick(validateResponse.user, [
    'firstName',
    'lastName',
    'affiliation',
    'title',
  ])

  res.status(200).json(resBody)
}
