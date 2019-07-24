const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database(`${database}`)

const Movie = {
  all () {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM movies', (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    })
  },

  create ({ title, year_released, poster_url }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO movies
          (title, year_released, poster_url)
        VALUES
          (?, ?, ?)
        `
      const values = [title, year_released, poster_url]
      db.run(sql, values, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    })
  },

  delete ({ id }) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM movies WHERE id = ?'
      const values = [id]
      db.run(sql, values, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    })
  },

  getById (id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM movies WHERE id = ?', [id], function (err, results) {
        if (err) reject(err)
        resolve(results)
      })
    })
  },

  update ({ id, title, year_released, poster_url }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE
          movies
        SET
          title = ?,
          year_released = ?,
          poster_url = ?
        WHERE
          id = ?
        `
      const values = [title, year_released, poster_url, id]
      db.run(sql, values, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    })
  }
}

module.exports = { Movie }

