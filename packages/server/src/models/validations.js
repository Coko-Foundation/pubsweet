// This module is used for communicating validation requirements to the
// client and server, it sits in the middle.

const Joi = require('joi')
const { merge, flatten } = require('lodash')

// These are fixed/required validations, they are combined with configurable
// validations later

const validations = {
  fragment: {
    id: Joi.string()
      .guid()
      .required(),
    type: Joi.string().required(),
    fragmentType: Joi.string().required(),
    fragments: Joi.array().items(Joi.string().guid()),
    owners: Joi.array().items(Joi.string().guid()),
  },
  collection: {
    id: Joi.string().guid(),
    type: Joi.string().required(),
    owners: Joi.array().items(Joi.string().guid()),
    fragments: Joi.array().items(
      Joi.alternatives().try(
        // a fragment ID
        Joi.string().guid(),
        // or a fragment object
        Joi.object({ type: Joi.string().valid('fragment') }).unknown(true),
      ),
    ),
    created: Joi.date(),
  },
  user: {
    id: Joi.string()
      .guid()
      .required(),
    type: Joi.string(),
    username: Joi.string()
      .alphanum()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    passwordHash: Joi.string().required(),
    admin: Joi.boolean(),
    fragments: Joi.array().items(Joi.string().guid()),
    collections: Joi.array().items(Joi.string().guid()),
    teams: Joi.array().items(Joi.string().guid()),
    passwordResetToken: Joi.string(),
    passwordResetTimestamp: Joi.date().timestamp(),
  },
  team: {
    id: Joi.string()
      .guid()
      .required(),
    type: Joi.string().required(),
    name: Joi.string().required(),
    object: Joi.object(),
    teamType: Joi.string().required(),
    members: Joi.array().items(Joi.string().guid()),
    owners: Joi.array().items(Joi.string().guid()),
  },
}

const allValidations = (type, extendedValidations) => {
  // If there are several source of extended validations,
  // deep merge them.
  if (Array.isArray(extendedValidations)) {
    extendedValidations = merge(...extendedValidations)
  }

  let extendedValidationsForType = {}

  if (extendedValidations && extendedValidations[type]) {
    extendedValidationsForType = extendedValidations[type]
  }

  if (Array.isArray(extendedValidationsForType)) {
    const alternatives = extendedValidationsForType.map(alternative => ({
      ...validations[type],
      ...alternative,
    }))
    return Joi.alternatives().try(...alternatives)
  }

  return Joi.object().keys({
    ...validations[type],
    ...extendedValidationsForType,
  })
}

module.exports = extendedValidations => {
  const coreModels = Object.keys(validations)

  if (!extendedValidations) {
    extendedValidations = []
  } else if (!Array.isArray(extendedValidations)) {
    extendedValidations = [extendedValidations]
  }

  const externalModels = [
    ...new Set(
      flatten(extendedValidations.map(validations => Object.keys(validations))),
    ),
  ]

  const models = coreModels.concat(externalModels)

  const exported = {}
  models.forEach(model => {
    exported[model] = allValidations(model, extendedValidations)
  })
  return exported
}
