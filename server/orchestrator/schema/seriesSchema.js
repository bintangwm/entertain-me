const { gql } = require('apollo-server')
const axios = require('axios')
const Redis =  require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type Serie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    series: [Serie]
    serie(_id:ID): Serie
  }
  
  input SerieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  extend type Mutation {
    addSerie(data: SerieInput): Serie
    updateSerie(data: SerieInput, id: String): Serie
    deleteSerie(id: String): Serie
  }
`

const resolvers = {
  Query: {
    series: async () => {
      try {
        const dataSeries = await redis.get('dataSeries')
        if (dataSeries) {
          return JSON.parse(dataSeries)
        } else {
          const response = await axios({
            url: 'http://localhost:5002/series',
            method: 'get'
          })
          await redis.set('dataSeries', JSON.stringify(response.data))
          return response.data
        }
      } catch (err) {
        return console.log(err);
      }
    },
    serie: async (parent, args, context, info) => {
      const { _id } = args
      try {
        const dataSerie = await redis.get('dataSerie')
        console.log(dataSerie);
        if (dataSerie && dataSerie._id === _id) {
          return JSON.parse(dataSerie)
        } else {
          const response = await axios({
            url: `http://localhost:5002/series/${_id}`,
            method: 'get'
          })
          await redis.set('dataSerie', JSON.stringify(response.data))
          return response.data
        }
      } catch (err) {
        console.log(err);
      } 
    }
  },
  Mutation: {
    addSerie: async (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.data
      const payload = { title, overview, poster_path, popularity, tags }
      try {
        const response = await axios({
          url: 'http://localhost:5002/series',
          method: 'post',
          data: payload
        })
        await redis.del('dataSeries')
        return response.data
      } catch (err) {
        console.log(err);
      }
    },
    updateSerie: async (_, args) => {
      const { id } = args
      try {
        const response = await axios({
          url: `http://localhost:5002/series/${id}`,
          method: 'put',
          data: args.data
        })
        await redis.del('dataSeries')
        await redis.del('dataSerie')
        return response.data
      } catch (err) {
        console.log(err);
      }
    },
    deleteSerie: async (_, args) => {
      const { id } = args
      try {
        const response = await axios({
          url: `http://localhost:5002/series/${id}`,
          method: 'delete'
        })
        await redis.del('dataSeries')
        await redis.del('dataSerie')
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
