module.exports = {
  "secret": "EXAMPLEDONTUSE",
  "API_ENDPOINT": "/api",
  // Creates the basic roles: admin, contributor, reader
  // Admin:       can do everything
  // Contributor: can create new fragments and read public objects
  // Reader:      can read public objects
  // There's an additional implicit role: owner
  // Owner:       can do everything on objects they own
  "roles": [
    {
      "name": "admin",
      "resources": ["/api/users", "/api/collection", "/api/collection/fragments"],
      "permissions": "*"
    },
    {
      "name": "contributor",
      "resources": ["/api/collection/fragments"],
      "permissions": ["create"]
    },
    {
      "name": "reader",
      "resources": ["/api/collection/fragments"],
      "permissions": []
    }
  ]
}
