const logger = require('@pubsweet/logger')
const uuid = require('uuid')
const crypto = require('crypto')

const checkForUndefinedParams = (...params) => {
  if (params.includes(undefined)) {
    return false
  }

  return true
}

const validateEmailAndToken = async (email, token, userModel) => {
  try {
    const user = await userModel.findByEmail(email)
    if (user) {
      if (token !== user.passwordResetToken) {
        logger.error(
          `invite pw reset tokens do not match: REQ ${token} vs. DB ${
            user.passwordResetToken
          }`,
        )
        return {
          success: false,
          status: 400,
          message: 'invalid request',
        }
      }
      return { success: true, user }
    }
  } catch (e) {
    if (e.name === 'NotFoundError') {
      logger.error('invite pw reset on non-existing user')
      return {
        success: false,
        status: 404,
        message: 'user not found',
      }
    } else if (e.name === 'ValidationError') {
      logger.error('invite pw reset validation error')
      return {
        success: false,
        status: 400,
        message: e.details[0].message,
      }
    }
    logger.error('internal server error')
    return {
      success: false,
      status: 500,
      message: e.details[0].message,
    }
  }
  return {
    success: false,
    status: 500,
    message: 'something went wrong',
  }
}

const hasInviteRight = (configRoles, userRoles, role) => {
  const includesRole = existingRole =>
    configRoles.inviteRights[existingRole].includes(role)
  if (!userRoles.some(includesRole)) {
    logger.error(`incorrect role when inviting a user`)

    return {
      success: false,
      status: 403,
      message: `${userRoles} cannot invite a ${role}`,
    }
  }

  return {
    success: true,
    status: null,
    message: null,
  }
}

const handleNotFoundError = async (error, item) => {
  const response = {
    success: false,
    status: 500,
    message: 'Something went wrong',
  }
  if (error.name === 'NotFoundError') {
    logger.error(`invalid ${item} id`)
    response.status = 404
    response.message = `${item} not found`
    return response
  }

  logger.error(error)
  return response
}

const createNewTeam = async (collectionId, emailType, user, TeamModel) => {
  let permissions, group, name
  switch (user.roles[0]) {
    case 'handlingEditor':
      emailType = 'invite-handling-editor'
      permissions = 'editor'
      group = 'editor'
      name = 'Handling Editor'
      break
    case 'reviewer':
      emailType = 'invite-reviewer'
      permissions = 'reviewer'
      group = 'reviewer'
      name = 'Reviewer'
      break
    default:
      break
  }

  const teamBody = {
    teamType: {
      name: user.roles[0],
      permissions,
    },
    group,
    name,
    object: {
      type: 'collection',
      id: collectionId,
    },
    members: [user.id],
  }
  const team = new TeamModel(teamBody)
  await team.save()
  return emailType
}

const createNewUser = async (
  email,
  role,
  firstName,
  lastName,
  affiliation,
  title,
  UserModel,
) => {
  const userBody = {
    username: uuid.v4().slice(0, 8),
    email,
    password: uuid.v4(),
    roles: [role],
    passwordResetToken: crypto.randomBytes(32).toString('hex'),
    isConfirmed: false,
    firstName,
    lastName,
    affiliation,
    title,
    admin: role === 'admin',
  }
  let newUser = new UserModel(userBody)
  newUser = await newUser.save()
  return newUser
}

module.exports = {
  checkForUndefinedParams,
  validateEmailAndToken,
  hasInviteRight,
  handleNotFoundError,
  createNewTeam,
  createNewUser,
}
