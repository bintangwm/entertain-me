const Movies = require('../models/Movies')

class MoviesController {
  static async getAll (req, res, next) {
    try {
      const moviesList = await Movies.getAll()
      res.status(200).json(moviesList)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async getById (req, res, next) {
    const id = req.params.id
    try {
      const movies = await Movies.getById(id)
      res.status(200).json(movies)
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
      popularity: +popularity,
      tags: tags.split(',')
    }
    try {
      const movies = await Movies.create(payload)
      res.status(200).json(movies.ops[0])
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
      popularity: +popularity,
      tags: tags.split(',')
    }
    try {
      const movies = await Movies.editById(id, payload)
      res.status(200).json(movies.value)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deletebyId (req, res, next) {
    const id = req.params.id
    try {
      const movies = await Movies.deletebyId(id)
      res.status(200).json(movies.value)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = MoviesController