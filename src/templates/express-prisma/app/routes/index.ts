import express from 'express'
import { getCustomRoute } from './customRoute'


function getAppRoutes() {
  const router = express.Router()

  router.use('/route', getCustomRoute())

  return router
}
export {getAppRoutes}