const express = require('express')
const app = express()
const port = 5002
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.status(200).json('hello, you are at series (entertain-me) API')
})

app.use('/', router)

app.listen(port, () => {
  console.log('listening to port: ' + port)
})