const { gql, ApolloServer, makeExecutableSchema } = require('apollo-server')
const movieSchema = require('./schema/moviesSchema')
const seriesSchema = require('./schema/seriesSchema')

const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    seriesSchema.typeDefs,
    movieSchema.typeDefs
  ],
  resolvers: [
    seriesSchema.resolvers,
    movieSchema.resolvers
  ]
})

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
