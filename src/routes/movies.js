const router = require('express').Router()
const { Movie } = require('../models/Movie')
const { respond, resource } = require(`${lib}/respond`)('movie', Movie.getById)
const { MoviesController } = require('../controllers/MoviesController')

router.get('/movies', respond(MoviesController.all))
router.get('/movies/:id', resource, respond(MoviesController.get))
router.post('/movies/create', respond(MoviesController.create))
router.post('/movies/:id/update', resource, respond(MoviesController.update))
router.post('/movies/:id/delete', resource, respond(MoviesController.delete))

module.exports = router

