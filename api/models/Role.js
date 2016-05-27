'use strict'

class Role {
  constructor (properties) {
    this.type = 'role'
    this.name = properties.name
    this.resources = properties.resources
    this.permissions = properties.permissions || '*'
  }

  save () {
    return new Promise(function (resolve, reject) {
      acl.allow(this.name, this.resources, this.permissions, function (err) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log('Saving', this.type, this.name)
          resolve(this)
        }
      }.bind(this))
    }.bind(this))
  }

  static userRoles (userId) {
    return acl.userRoles(userId)
  }

  static addUserRoles (userId, role, User) {
    return acl.addUserRoles(userId, role).then(function () {
      return this.syncRoles(userId, User)
    }.bind(this)).catch(function (err) {
      console.error(err)
      throw err
    })
  }

  static syncRoles (userId, User) {
    // Roles is a property on the User model that is synced with the ACL system
    let roles
    return this.userRoles(userId).then(function (roles) {
      roles = roles
      return User.find(userId)
    }).then(function (user) {
      user.roles = roles
      return user.save()
    })
  }

  static removeUserRoles (userId, role, User) {
    return acl.removeUserRoles(userId, role).then(function () {
      return this.syncRoles(userId, User)
    }.bind(this)).catch(function (err) {
      console.error(err)
      throw err
    })
  }

  static findByName (name) {
    return acl.whatResources(name, function (resources) {
      return new this({
        name: name,
        resources: resources
      })
    })
  }
}

module.exports = Role
