'use strict'

// This module is used for communicating validation requirements to the
// client and server, it sits in the middle.

const Joi = require('joi')

// These are fixed/required validations, they are combined with configurable
// validations later

let validations = {
  fragment: {
    id: Joi.string().guid().required(),
    type: Joi.string().required(),
    fragmentType: Joi.string().required(),
    title: Joi.string(),
    rev: Joi.string(),
    fragments: Joi.array().items(Joi.string().guid()),
    owners: Joi.array().items(Joi.string().guid())
  },
  collection: {
    id: Joi.string().guid().required(),
    type: Joi.string().required(),
    rev: Joi.string(),
    owners: Joi.array().items(Joi.string().guid()),
    fragments: Joi.array().items(
      Joi.alternatives().try(
        // a fragment ID
        Joi.string(),
        // or a fragment object
        Joi.object({ type: Joi.string().valid('fragment') }).unknown(true)
      )
    )
  },
  user: {
    id: Joi.string().guid().required(),
    type: Joi.string(),
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    passwordHash: Joi.string().required(),
    admin: Joi.boolean(),
    rev: Joi.string(),
    fragments: Joi.array().items(Joi.string().guid()),
    collections: Joi.array().items(Joi.string().guid()),
    teams: Joi.array().items(Joi.string().guid()),
    passwordResetToken: Joi.string(),
    passwordResetTimestamp: Joi.date().timestamp()
  },
  team: {
    id: Joi.string().guid().required(),
    type: Joi.string().required(),
    name: Joi.string().required(),
    object: Joi.object().required(),
    teamType: Joi.object().required(),
    rev: Joi.string(),
    members: Joi.array().items(Joi.string().guid())
  }
}

let allValidations = function (type, config) {
  let extraValidations = {}

  if (config.validations && config.validations[type]) {
    extraValidations = config.validations[type]
  }

  if (Array.isArray(extraValidations)) {
    const alternatives = extraValidations.map(extra => ({...validations[type], ...extra}))
    return Joi.alternatives().try(...alternatives)
  }

  return Joi.object().keys({...validations[type], ...extraValidations})
}

module.exports = function (config) {
  return {
    fragment: allValidations('fragment', config),
    collection: allValidations('collection', config),
    user: allValidations('user', config),
    team: allValidations('team', config)
  }
}
