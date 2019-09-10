const fs = require('fs')
const path = require('path')
const { prompt, close } = require('./prompt')
const { generateControllerTemplate } = require('./controller')
const { generateModelTemplate } = require('./model')
const { generateRoutesTemplate } = require('./routes')
// Entity entity Entities entities tablename fields/columns

async function main () {
  const entityInput = await prompt('What is the singular name of your new entity (ex: Movie)? ')
  const entity = entityInput.toLowerCase()
  const Entity = entity[0].toUpperCase() + entity.slice(1)

  const entitiesInput = await prompt('What is the plural name of your new entity (ex: Movies)? ')
  const entities = entitiesInput.toLowerCase()
  const Entities = entities[0].toUpperCase() + entities.slice(1)

  const tablenameInput = await prompt(`What is the name of your new database table (leave blank for default: ${entities})? `)
  const tablename = tablenameInput || entities
  const fieldsInput = await prompt('What are the fields/columns for you new entity (separate with a space; id included already by default)? ')
  const fields = fieldsInput.split(' ')

  const routesPath = path.resolve(__dirname, '../src/routes/' + entities + '.js')
  const routesFileData = generateRoutesTemplate({ Modelname: Entity, modelname: entity, plural: entities })
  fs.writeFileSync(routesPath, routesFileData)
  console.log('created routes file')
  fs.appendFileSync(path.resolve(__dirname, '../src/routes/index.js'), `\nrouter.use(require('./${entities}'))`)
  console.log('auto imported routes in index')

  const controllerPath = path.resolve(__dirname, '../src/controllers/' + Entities + 'Controller.js')
  const controllerFileData = generateControllerTemplate({ modelname: entity, ModelPlural: Entities, Modelname: Entity, fields })
  fs.writeFileSync(controllerPath, controllerFileData)
  console.log('created controller file')

  const modelPath = path.resolve(__dirname, '../src/models/' + Entity + '.js')
  const modelFileData = generateModelTemplate({ Modelname: Entity, tablename, fields })
  fs.writeFileSync(modelPath, modelFileData)
  console.log('created model file')

  close()
}

main()

