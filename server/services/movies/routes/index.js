const router = require('express').Router()
const tvSeriesRouter = require('./tvSeries')
const moviesRouter = require('./movies')

router.use('/movies', moviesRouter)
router.use('/tvSeries', tvSeriesRouter)

module.exports = router
