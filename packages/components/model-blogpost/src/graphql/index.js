const typeDefs = `
  extend type Fragment {
    source: String
    kind: String
    title: String
    presentation: String
    published: Boolean
    filtered: String
    path: String
  }

  extend input FragmentInput {
    source: String
    kind: String
    title: String
    presentation: String
    published: Boolean
    filtered: String
    path: String
  }
`

module.exports = { typeDefs }
