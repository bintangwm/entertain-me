const router = require('express').Router()
const seriesRouter = require('./series')
const moviesRouter = require('./movies')

router.use('/movies', moviesRouter)
router.use('/series', seriesRouter)

module.exports = router
