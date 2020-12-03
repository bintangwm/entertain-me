const router = require('express').Router()
const MoviesController = require('../controllers/moviesController')

router.get('/', MoviesController.getAll)
router.post('/', MoviesController.create)
router.get('/:id', MoviesController.getById)
router.put('/:id', MoviesController.editById)
router.delete('/:id', MoviesController.deletebyId)

module.exports = router
