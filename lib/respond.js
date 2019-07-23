// middleware that will retrieve a resource from the database
// so that it can be added onto the Express request object
// and then passed into the controller method
function getResourceGenerator (getResourceById, requestObjectPropertyName) {
  return async function (req, res, next) {
    const id = req.params.id
    try {
      req[requestObjectPropertyName] = await getResourceById(id)
      next()
    } catch (err) {
      res.status(500).send(`Unable to fetch ${requestObjectPropertyName}`)
    }
  }
}

function respondGenerator (requestObjectPropertyName) {
  return (controllerFn) => async (req, res, next) => {
    // this allows for simple "hello world" demo
    // as well as for sending html
    if (typeof controllerFn === 'string') return res.send(controllerFn)

    // but normally perform controller function and return results
    try {
      const resource = req[requestObjectPropertyName]
      const controllerParams = {
        body: req.body,
        params: req.params,
        query: req.query
      }
      controllerParams[requestObjectPropertyName] = resource

      res.send(await controllerFn(controllerParams))
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

module.exports = function (requestObjectPropertyName, getResourceById) {
  const respond = respondGenerator(requestObjectPropertyName)
  const resource = getResourceGenerator(getResourceById, requestObjectPropertyName)
  return { respond, resource }
}

