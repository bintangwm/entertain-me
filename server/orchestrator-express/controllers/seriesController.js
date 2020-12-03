const axios = require('../config/axiosSeries')

class SeriesController {
  static getAll (req, res, next) {
    axios({
      url: '/series',
      method: 'get'
    })
      .then(({ data }) => {
        // console.log(data);
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getById (req, res, next) {
    const id = req.params.id
    axios({
      url: `/series/${id}`,
      method: 'get'
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static create (req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const payload = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    axios({
      url: '/series',
      method: 'post',
      data: payload
    })
      .then(({ data }) => {
        res.status(201).json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }

  static editById (req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const id = req.params.id
    const payload = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    axios({
      url: `/series/${id}`,
      method: 'put',
      data: payload
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deletebyId (req, res, next) {
    const id = req.params.id
    axios({
      url: `/series/${id}`,
      method: 'delete'
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = SeriesController