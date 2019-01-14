const resolvers = require('./server/resolvers')
const typeDefs = require('./server/typeDefs')

module.exports = {
  frontend: {
    components: [() => require('./components')],
  },
  resolvers,
  typeDefs,
}
