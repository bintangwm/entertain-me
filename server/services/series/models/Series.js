const db = require('../config/config')
const dbSeries = db.collection('series')
const { ObjectId } = require('mongodb')

class Series {
  static getAll() {
    return dbSeries.find().toArray()
  }

  static getById(id) {
    const _id = ObjectId(id)
    return dbSeries.findOne({ _id })
  }

  static create(payload) {
    return dbSeries.insertOne(payload)
  }

  static editById(id, payload) {
    const _id = ObjectId(id)
    const options = {
      returnOriginal: false
    }
    return dbSeries.findOneAndUpdate({ _id }, { $set: payload }, options)
  }

  static deletebyId(id) {
    const _id = ObjectId(id)
    const options = {
      returnOriginal: false
    }
    return dbSeries.findOneAndDelete({ _id }, options)
  } 
}

module.exports = Series