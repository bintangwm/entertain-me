const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:5002/'
})

module.exports = instance