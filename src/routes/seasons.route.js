import express from 'express'
import { SeasonsValidationSchema } from '../validations/index.js'
import { validate } from '../middleware/index.js'
import { SeasonsController } from '../controllers/index.js'

const router = express.Router()

router.get('/', SeasonsController.getAll)

router.get(
  '/:id',
  validate(SeasonsValidationSchema.seasonId),
  SeasonsController.getById
)

router.get(
  '/:id/episodes',
  validate(SeasonsValidationSchema.seasonId),
  SeasonsController.getEpisodesBySeason
)

router.post('/', validate(SeasonsValidationSchema.season), SeasonsController.add)

router.patch(
  '/:id',
  validate(SeasonsValidationSchema.seasonId),
  validate(SeasonsValidationSchema.series),
  SeasonsController.updateById
)

router.delete(
  '/:id',
  validate(SeasonsValidationSchema.seasonId),
  SeasonsController.deleteById
)

export default router
