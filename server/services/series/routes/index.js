const router = require('express').Router()
const seriesRouter = require('./series')

router.use('/series', seriesRouter)

module.exports = router
