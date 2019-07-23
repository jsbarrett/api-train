const { Movie } = require('../models/Movie')

const MoviesController = {
  async all () {
    return await Movie.all()
  },

  async create ({ body }) {
    const { movie } = body
    return await Movie.create(movie)
  },

  async delete ({ movie }) {
    return await Movie.delete(movie)
  },

  async get ({ movie }) {
    return movie
  },

  async update ({ movie, body }) {
    return await Movie.update({
      id: movie.id,
      title: body.title || movie.title,
      year_released: body.year_released || movie.year_released,
      poster_url: body.poster_url || movie.poster_url
    })
  }
}

module.exports = { MoviesController }

