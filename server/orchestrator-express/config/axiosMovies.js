const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:5001/'
})

module.exports = instance