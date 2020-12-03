const Movies = require('../models/Movies')

class MoviesController {
  static async getAll (req, res, next) {
    try {
      const MoviesList = await Movies.getAll()
      res.status(200).json(MoviesList)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async getById (req, res, next) {
    const id = req.params.id
    try {
      const Movies = await Movies.getById(id)
      console.log(Movies);
      res.status(200).json(Movies)
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
      const Movies = await Movies.create(payload)
      res.status(200).json(Movies)
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
      const Movies = await Movies.editById(id, payload)
      res.status(200).json(Movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deletebyId (req, res, next) {
    const id = req.params.id
    try {
      const Movies = await Movies.deletebyId(id)
      res.status(200).json(Movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = MoviesController