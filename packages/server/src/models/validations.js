// This module is used for communicating validation requirements to the
// client and server, it sits in the middle.

const Joi = require('joi')
const { merge, flatten } = require('lodash')

// These are fixed/required validations, they are combined with configurable
// validations later

const validations = {
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
