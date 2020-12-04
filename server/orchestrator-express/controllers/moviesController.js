const axios = require('../config/axiosMovies')
const Redis = require('ioredis')
const redis = new Redis()

class MoviesController {
  static async getAll (req, res, next) {
    try {
      const dataMovies = await redis.get('dataMovies')
      if (dataMovies) {
        // console.log(dataMovies, '<< dataMovies');
        res.status(200).json(JSON.parse(dataMovies))
      } else {
        const response = await axios({
          url: '/movies',
          method: 'get'
        })
        await redis.set('dataMovies', JSON.stringify(response.data), "EX", 30)
        setTimeout(() => {
          res.status(200).json(response.data)
        }, 2000);
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async getById (req, res, next) {
    const id = req.params.id
    try {
      const dataMovie = await redis.get('dataMovie')
      if (dataMovie) {
        // console.log(dataMovies, '<< dataMovie');
        res.status(200).json(JSON.parse(dataMovie))
      } else {
        const response = await axios({
          url: `/movies/${id}`,
          method: 'get'
        })
        await redis.set('dataMovie', JSON.stringify(response.data), "EX", 30)
        setTimeout(() => {
          res.status(200).json(response.data)
        }, 2000);
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async create (req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const payload = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    try {
      const response = await axios({
        url: '/movies',
        method: 'post',
        data: payload
      })
      await redis.del('dataMovies')
      await redis.del('dataMovie')
      res.status(201).json(response.data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async editById (req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const id = req.params.id
    const payload = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    try {
      const response = await axios({
        url: `/movies/${id}`,
        method: 'put',
        data: payload
      })
      await redis.del('dataMovies')
      await redis.del('dataMovie')
      res.status(201).json(response.data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deletebyId (req, res, next) {
    const id = req.params.id
    try {
      const response = await axios({
        url: `/movies/${id}`,
        method: 'delete'
      })
      await redis.del('dataMovies')
      await redis.del('dataMovie')
      res.status(201).json(response.data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = MoviesController