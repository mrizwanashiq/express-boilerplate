import express from 'express'
import { SeriesValidationSchema } from '../validations/index.js'
import { validate } from '../middleware/index.js'
import { SeriesController } from '../controllers/index.js'

const router = express.Router()

router.get('/', SeriesController.getAll)

router.get(
  '/:id',
  validate(SeriesValidationSchema.seriesId),
  SeriesController.getById
)

router.get(
  '/:id/seasons',
  validate(SeriesValidationSchema.seriesId),
  SeriesController.getSeasonsBySeries
)

router.get(
  '/:id/seasons/episodes',
  validate(SeriesValidationSchema.seriesId),
  SeriesController.getEpisodesBySeries
)

router.post('/', validate(SeriesValidationSchema.series), SeriesController.add)

router.patch(
  '/:id',
  validate(SeriesValidationSchema.seriesId),
  validate(SeriesValidationSchema.series),
  SeriesController.updateById
)

router.delete(
  '/:id',
  validate(SeriesValidationSchema.seriesId),
  SeriesController.deleteById
)

export default router
