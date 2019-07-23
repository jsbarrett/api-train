function generateControllerTemplate (modelname, Modelname, ModelPlural) {
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
      id: ${modelname}.id
      // example
      // title: body.title || ${modelname}.title
    })
  }
}

module.exports = { ${ModelPlural}Controller }
`
}

module.exports = { generateControllerTemplate }

