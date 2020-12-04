const { gql } = require('apollo-server')
const axios = require('axios')
const Redis =  require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(_id:ID): Movie
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  extend type Mutation {
    addMovie(data: MovieInput): Movie
    updateMovie(data: MovieInput, id: String): Movie
    deleteMovie(id: String): Movie
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const dataMovies = await redis.get('dataMovies')
        if (dataMovies) {
          return JSON.parse(dataMovies)
        } else {
          const response = await axios({
            url: 'http://localhost:5001/movies',
            method: 'get'
          })
          await redis.set('dataMovies', JSON.stringify(response.data))
          return response.data
        }
      } catch (err) {
        return console.log(err);
      }
    },
    movie: async (parent, args, context, info) => {
      const { _id } = args
      try {
        const dataMovie = await redis.get('dataMovie')
        // console.log(response.data);
        if (dataMovie._id === _id && dataMovie) {
          return JSON.parse(dataMovie)
        } else {
          const response = await axios({
            url: `http://localhost:5001/movies/${_id}`,
            method: 'get'
          })
          await redis.set('dataMovie', JSON.stringify(response.data))
          return response.data
        }
      } catch (err) {
        console.log(err);
      } 
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.data
      const payload = { title, overview, poster_path, popularity, tags }
      try {
        const response = await axios({
          url: 'http://localhost:5001/movies',
          method: 'post',
          data: payload
        })
        await redis.del('dataMovies')
        return response.data
      } catch (err) {
        console.log(err);
      }
    },
    updateMovie: async (_, args) => {
      const { id } = args
      try {
        const response = await axios({
          url: `http://localhost:5001/movies/${id}`,
          method: 'put',
          data: args.data
        })
        await redis.del('dataMovies')
        await redis.del('dataMovie')
        return response.data
      } catch (err) {
        console.log(err);
      }
    },
    deleteMovie: async (_, args) => {
      const { id } = args
      try {
        const response = await axios({
          url: `http://localhost:5001/movies/${id}`,
          method: 'delete'
        })
        await redis.del('dataMovies')
        await redis.del('dataMovie')
        return response.data
      } catch (err) {
        console.log(err);
      }
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
}
