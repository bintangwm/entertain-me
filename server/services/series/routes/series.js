const router = require('express').Router()
const SeriesController = require('../controllers/seriesController')

router.get('/', SeriesController.getAll)
router.post('/', SeriesController.create)
router.get('/:id', SeriesController.getById)
router.put('/:id', SeriesController.editById)
router.delete('/:id', SeriesController.deletebyId)

module.exports = router
