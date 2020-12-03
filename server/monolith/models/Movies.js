const db = require('../config/config')
const dbMovies = db.collection('movies')
const { ObjectId } = require('mongodb')

class Movies {
  static getAll() {
    return dbMovies.find().toArray()
  }

  static getById(id) {
    const _id = ObjectId(id)
    return dbMovies.findOne({ _id })
  }

  static create(payload) {
    return dbMovies.insertOne(payload)
  }

  static editById(id, payload) {
    const _id = ObjectId(id)
    const options = {
      returnOriginal: false
    }
    return dbMovies.findOneAndUpdate({ _id }, { $set: payload }, options)
  }

  static deletebyId(id) {
    const _id = ObjectId(id)
    const options = {
      returnOriginal: false
    }
    return dbMovies.findOneAndDelete({ _id }, options)
  } 
}

module.exports = Movies