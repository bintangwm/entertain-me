const axios = require('../config/axiosSeries')
const Redis =  require('ioredis')
const redis = new Redis()

class SeriesController {
  static async getAll (req, res, next) {
    try {
      const dataSeries = await redis.get('dataSeries')
      if (dataSeries) {
        // console.log(dataSeries, '<< dataSeries');
        res.status(200).json(JSON.parse(dataSeries))
      } else {
        const response = await axios({
          url: '/series',
          method: 'get'
        })
        await redis.set('dataSeries', JSON.stringify(response.data))
        res.status(200).json(response.data)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async getById (req, res, next) {
    const id = req.params.id
    try {
      const dataSerie = await redis.get('dataSerie')
      if (dataSerie._id === id) {
        // console.log(dataSerie, '<< dataSerie');
        res.status(200).json(JSON.parse(dataSerie))
      } else {
        const response = await axios({
          url: `/series/${id}`,
          method: 'get'
        })
        await redis.set('dataSerie', JSON.stringify(response.data))
        res.status(200).json(response.data)
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
        url: '/series',
        method: 'post',
        data: payload
      })
      await redis.del('dataSeries')
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
        url: `/series/${id}`,
        method: 'put',
        data: payload
      })
      await redis.del('dataSeries')
      await redis.del('dataSerie')
      res.status(200).json(response.data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deletebyId (req, res, next) {
    const id = req.params.id
    try {
      const response = await axios({
        url: `/series/${id}`,
        method: 'delete'
      })
      await redis.del('dataSeries')
      await redis.del('dataSerie')
      res.status(200).json(response.data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = SeriesController