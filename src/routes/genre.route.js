import express from 'express'
import { GenreValidationSchema } from '../validations/index.js'
import { validate } from '../middleware/index.js'
import { GenreController } from '../controllers/index.js'

const router = express.Router()

router.get('/', GenreController.getAll)

router.get(
  '/:id',
  validate(GenreValidationSchema.genreId),
  GenreController.getById
)

router.get(
  '/:id/series',
  validate(GenreValidationSchema.genreId),
  GenreController.getSeriesByGenre
)

router.get(
  '/:id/series/seasons',
  validate(GenreValidationSchema.genreId),
  GenreController.getSeasonsByGenre
)

router.post('/', validate(GenreValidationSchema.genre), GenreController.add)

router.patch(
  '/:id',
  validate(GenreValidationSchema.genreId),
  validate(GenreValidationSchema.genre),
  GenreController.updateById
)

router.delete(
  '/:id',
  validate(GenreValidationSchema.genreId),
  GenreController.deleteById
)

export default router
