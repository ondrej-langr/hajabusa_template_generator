import express from 'express'
import add from './controllers/add'
import subtract from './controllers/subtract'

function getCustomRoute() {
  const router = express.Router()

  router.get('/add', add)
  router.get('/subtract', subtract)

  return router
}
export {getCustomRoute}