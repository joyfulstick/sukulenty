const { GraphQLServer } = require('graphql-yoga'),
  Mutation = require('./resolvers/Mutation'),
  Query = require('./resolvers/Query'),
  db = require('./db')

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  })
}

module.exports = createServer
