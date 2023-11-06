const express = require('express');
const genreRouter = require('./genre.router');
const directorRouter = require('./director.router');
const movieRouter = require('./movie.router');
const actorRouter = require('./actor.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter)
router.use('/directors', directorRouter)
router.use('/movies', movieRouter)
router.use('/actors', actorRouter)


module.exports = router;