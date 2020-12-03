const express = require('express')
const app = express()
const port = 5000
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.status(200).json('hello, you are at entertain-me(orchestrator) API')
})

app.use('/', router)

app.listen(port, () => {
  console.log('listening to port: ' + port)
})