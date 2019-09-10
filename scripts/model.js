function generateModelTemplate ({ Modelname, tablename, fields }) {
  return `const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database(\`\${database}\`)

const ${Modelname} = {
  all () {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM ${tablename}', function (err, rows) {
        if (err) return reject(err)
        resolve(rows)
      })
    })
  },

  create ({ ${fields.join(', ')} }) {
    return new Promise((resolve, reject) => {
      const sql = \`
        INSERT INTO ${tablename}
          (${fields.join(', ')})
        VALUES
          (${fields.map(x => '?').join(', ')})
        \`
      const values = [${fields.join(', ')}]
      db.run(sql, values, (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },

  delete ({ id }) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM ${tablename} WHERE id = ?'
      const values = [id]
      db.run(sql, values, (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },

  getById (id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM ${tablename} WHERE id = ?', [id], function (err, row) {
        if (err) return reject(err)
        resolve(row)
      })
    })
  },

  update ({ id, ${fields.join(', ')} }) {
    return new Promise((resolve, reject) => {
      const sql = \`
        UPDATE
          ${tablename}
        SET
${fields.map(x => (`          ${x} = ?`)).join(',\n')}
        WHERE
          id = ?
        \`
      const values = [${fields.join(', ')}, id]
      db.run(sql, values, (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  }
}

module.exports = { ${Modelname} }
`
}

module.exports = { generateModelTemplate }

