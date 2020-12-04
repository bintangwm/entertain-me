const Series = require('../models/Series')

class SeriesController {
  static async getAll (req, res, next) {
    try {
      const seriesList = await Series.getAll()
      res.status(200).json(seriesList)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async getById (req, res, next) {
    const id = req.params.id
    try {
      const series = await Series.getById(id)
      console.log(series);
      res.status(200).json(series)
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
      const series = await Series.create(payload)
      res.status(200).json(series.ops[0])
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
      const series = await Series.editById(id, payload)
      res.status(200).json(series.value)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deletebyId (req, res, next) {
    const id = req.params.id
    try {
      const series = await Series.deletebyId(id)
      res.status(200).json(series.value)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = SeriesController