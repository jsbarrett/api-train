function generateRoutesTemplate (Modelname, modelname, plural) {
  return `const router = require('express').Router()
const { ${Modelname} } = require('../models/${Modelname}')
const { respond, resource } = require(\`\${lib}/respond\`)('${modelname}', ${Modelname}.getById)
const { ${Modelname}Controller } = require('../controllers/${Modelname}Controller')

router.get('/${plural}', respond(${Modelname}Controller.all))
router.get('/${plural}/:id', resource, respond(${Modelname}Controller.get))
router.post('/${plural}/create', respond(${Modelname}Controller.create))
router.post('/${plural}/:id/update', resource, respond(${Modelname}Controller.update))
router.post('/${plural}/:id/delete', resource, respond(${Modelname}Controller.delete))

module.exports = router
`
}

module.exports = { generateRoutesTemplate }

