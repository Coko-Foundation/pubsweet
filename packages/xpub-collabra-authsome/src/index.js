/** The base class for Xpub Collabra's Authsome mode. */
class XpubCollabraMode {
  /**
   * Creates a new instance of XpubCollabraMode
   *
   * @param {string} userId A user's UUID
   * @param {string} operation The operation you're authorizing for
   * @param {any} object The object of authorization
   * @param {any} context Context for authorization, e.g. database access
   * @returns {string}
   */
  constructor(userId, operation, object, context) {
    this.userId = userId
    this.operation = XpubCollabraMode.mapOperation(operation)
    this.object = object
    this.context = context
  }

  /**
   * Maps operations from HTTP verbs to semantic verbs
   *
   * @param {any} operation
   * @returns {string}
   */
  static mapOperation(operation) {
    const operationMap = {
      GET: 'read',
      POST: 'create',
      PATCH: 'update',
      DELETE: 'delete',
    }

    return operationMap[operation] ? operationMap[operation] : operation
  }

  /**
   * Checks if user is a member of a team of a certain type for a certain object
   *
   * @param {any} user
   * @param {any} teamType
   * @param {any} object
   * @returns {boolean}
   */
  async isTeamMember(user, teamType, object) {
    if (!user || !Array.isArray(user.teams)) {
      return false
    }

    let membershipCondition
    if (object) {
      // We're asking if a user is a member of a team for a specific object
      membershipCondition = team =>
        team.teamType === teamType &&
        team.object &&
        team.object.id === object.id
    } else {
      // We're asking if a user is a member of a global team
      membershipCondition = team => team.teamType === teamType
    }

    const memberships = await Promise.all(
      user.teams.map(async teamId => {
        const team = await this.context.models.Team.find(teamId)
        return membershipCondition(team)
      }),
    )

    return memberships.includes(true)
  }

  /**
   * Returns permissions for unauthenticated users
   *
   * @param {any} operation
   * @param {any} object
   * @returns {boolean}
   */
  unauthenticatedUser(object) {
    return this.operation === 'something public'
  }

  /**
   * Checks if the user is an author, as represented with the owners
   * relationship
   *
   * @param {any} user
   * @param {any} object
   * @returns {boolean}
   */
  isAuthor(user) {
    if (!this.object || !this.object.owners || !user) {
      return false
    }
    return this.object.owners.includes(user.id)
  }

  /**
   * Checks if the user is an author, as represented with the owners
   * relationship
   *
   * @param {any} user
   * @returns {boolean}
   */
  isAdmin = user => user && user.admin

  /**
   * Checks if user is a handling editor (member of a team of type handling editor) for an object
   *
   * @param {any} user
   * @returns {boolean}
   */
  isAssignedHandlingEditor = (user, object) =>
    this.isTeamMember(user, 'Handling Editor', object)

  /**
   * Checks if user is a senior editor (member of a team of type senior editor) for an object
   *
   * @param {any} user
   * @returns {boolean}
   */
  isAssignedSeniorEditor = (user, object) =>
    this.isTeamMember(user, 'Senior Editor', object)

  /**
   * Checks if user is a senior editor (member of a team of type senior editor) for an object
   *
   * @param {any} user
   * @returns {boolean}
   */
  isManagingEditor = user => this.isTeamMember(user, 'Managing Editor')

  /**
   * Checks if userId is present, indicating an authenticated user
   *
   * @param {any} userId
   * @returns {boolean}
   */
  isAuthenticated = () => !!this.userId
}

/** This class is used to handle authorization requirements for REST endpoints. */
class RESTMode extends XpubCollabraMode {
  /**
   * Determine if the current operation is a listing of the collections
   *
   * @returns {boolean}
   * @memberof RESTMode
   */
  isListingCollections = () => {
    if (
      this.operation === 'read' &&
      this.object &&
      this.object.path === '/collections'
    ) {
      return true
    }
    return false
  }

  /**
   * An async functions that's the entry point for determining
   * authorization results. Returns true (if allowed), false (if not allowed),
   * and { filter: function(filterable) } if partially allowed
   *
   * @returns {any} Returns true, false or { filter: fn }
   * @memberof RESTMode
   */
  async determine() {
    if (!this.isAuthenticated()) {
      return this.unauthenticatedUser(this.operation)
    }

    const user = await this.context.models.User.find(this.userId)

    // Admins can do anything
    if (this.isAdmin(user)) {
      return true
    }

    if (this.isListingCollections()) {
      // Filtering for listing collections
      // Requirements:
      // 'My Submissions' for authors of a doc (people that have created a doc)
      // 'To Review' for reviewers
      // 'My Manuscripts'
      //   Senior Editor sees those they have been assigned to
      //   Handling Editor sees those they have been assigned to

      if (await this.isManagingEditor(user)) {
        return true
      }

      return {
        filter: async collections => {
          const filteredCollections = await Promise.all(
            collections.map(async collection => {
              const condition =
                this.isAuthor(user, collection) ||
                (await this.isAssignedHandlingEditor(user, collection)) || // eslint-disable-line
                (await this.isAssignedSeniorEditor(user, collection)) // eslint-disable-line
              return condition ? collection : undefined // eslint-disable-line
            }),
          )

          return filteredCollections.filter(collection => collection)
        },
      }
    }
    return false
  }
}

/** This class is used to handle authorization requirements for GraphQL. */
class GraphQLMode extends XpubCollabraMode {
  /**
   * Returns true if current operation is listing collections
   *
   * @memberof GraphQLMode
   * @returns {boolean}
   */
  isListingCollections = () => this.operation === 'list collections'

  /**
   * Returns true if the current operation is a create on collections
   *
   * @returns {boolean}
   */
  isCreatingCollections = () =>
    this.operation === 'create' && this.object === 'collection'

  async determine() {
    if (!this.isAuthenticated()) {
      return false
    }

    const user = await this.context.models.User.find(this.userId)

    // Admins can do anything
    if (this.isAdmin(user)) {
      return true
    }

    if (this.isListingCollections()) {
      return true
    }

    return false
  }
}

module.exports = {
  GET: (userId, operation, object, context) => {
    const mode = new RESTMode(userId, operation, object, context)
    return mode.determine()
  },
  POST: (userId, operation, object, context) => {
    const mode = new RESTMode(userId, operation, object, context)
    return mode.determine()
  },
  PATCH: (userId, operation, object, context) => {
    const mode = new RESTMode(userId, operation, object, context)
    return mode.determine()
  },
  DELETE: (userId, operation, object, context) => {
    const mode = new RESTMode(userId, operation, object, context)
    return mode.determine()
  },
  'list collections': (userId, operation, object, context) => {
    const mode = new GraphQLMode(userId, operation, object, context)
    return mode.determine()
  },
  create: (userId, operation, object, context) => {
    const mode = new GraphQLMode(userId, operation, object, context)
    return mode.determine()
  },
  read: (userId, operation, object, context) => {
    const mode = new GraphQLMode(userId, operation, object, context)
    return mode.determine()
  },
}
