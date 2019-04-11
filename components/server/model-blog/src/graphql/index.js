const typeDefs = `
  extend type Collection {
    non_public_property: String
    title: String
    published: Boolean
    filtered: String
  }

  extend input CollectionInput {
    non_public_property: String
    title: String
    published: Boolean
    filtered: String
  }
`

module.exports = { typeDefs }
