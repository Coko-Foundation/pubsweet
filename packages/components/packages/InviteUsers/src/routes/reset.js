const logger = require('@pubsweet/logger')
const helpers = require('../helpers/helpers')

module.exports = models => async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    title,
    affiliation,
    password,
    token,
  } = req.body
  if (
    !helpers.checkForUndefinedParams(
      email,
      firstName,
      lastName,
      title,
      affiliation,
      password,
      token,
    )
  ) {
    res.status(400).json({ error: 'missing required params' })
    return
  }

  if (password.length < 7) {
    res
      .status(400)
      .json({ error: 'password needs to be at least 7 characters long' })
    logger.error(
      `the user added an invalid password length: ${password.length}`,
    )
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

  if (validateResponse.user.isConfirmed) {
    res.status(400).json({ error: 'User is already confirmed' })
    return
  }

  const updateFields = {
    password,
    firstName,
    lastName,
    affiliation,
    title,
    isConfirmed: true,
  }

  let newUser = Object.assign(
    validateResponse.user,
    updateFields,
    validateResponse.user,
  )
  delete newUser.passwordResetToken

  newUser = await newUser.save()
  res.status(200).json(newUser)
}
