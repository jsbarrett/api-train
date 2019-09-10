function generateControllerTemplate ({ modelname, Modelname, ModelPlural, fields }) {
  return `const { ${Modelname} } = require('../models/${Modelname}')

const ${ModelPlural}Controller = {
  async all () {
    return await ${Modelname}.all()
  },

  async create ({ body }) {
    const { ${modelname} } = body
    return await ${Modelname}.create(${modelname})
  },

  async delete ({ ${modelname} }) {
    return await ${Modelname}.delete(${modelname})
  },

  async get ({ ${modelname} }) {
    return ${modelname}
  },

  async update ({ ${modelname}, body }) {
    return await ${Modelname}.update({
      id: ${modelname}.id,
${ fields.map(field => (
`      ${field}: body.${field} || ${modelname}.${field}`)).join(',\n') }
    })
  }
}

module.exports = { ${ModelPlural}Controller }
`
}

module.exports = { generateControllerTemplate }

