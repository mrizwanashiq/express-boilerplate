import express from 'express'
import { StreamsValidationSchema } from '../validations/index.js'
import { validate } from '../middleware/index.js'
import { StreamController } from '../controllers/index.js'

const router = express.Router()

router.get('/', StreamController.getAll)

router.get(
  '/:id',
  validate(StreamsValidationSchema.streamId),
  StreamController.getById
)

router.get(
  '/:id/user',
  validate(StreamsValidationSchema.streamId),
  StreamController.getUserByStream
)

router.get(
  '/:id/episode',
  validate(StreamsValidationSchema.streamId),
  StreamController.getEpisodeByStream
)

router.get(
  '/:id/episode/season',
  validate(StreamsValidationSchema.streamId),
  StreamController.getSeasonByStream
)

router.get(
  '/:id/episode/season/series',
  validate(StreamsValidationSchema.streamId),
  StreamController.getSeriesByStream
)

router.get(
  '/:id/episode/season/series/genre',
  validate(StreamsValidationSchema.streamId),
  StreamController.getGenreByStream
)

router.post('/', validate(StreamsValidationSchema.stream), StreamController.add)

router.patch(
  '/:id',
  validate(StreamsValidationSchema.streamId),
  validate(StreamsValidationSchema.stream),
  StreamController.updateById
)

router.delete(
  '/:id',
  validate(StreamsValidationSchema.streamId),
  StreamController.deleteById
)

export default router
