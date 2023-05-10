import express from 'express'
import { EpisodesValidationSchema } from '../validations/index.js'
import { validate } from '../middleware/index.js'
import { EpisodeController } from '../controllers/index.js'

const router = express.Router()

router.get('/', EpisodeController.getAll)

router.get(
  '/:id',
  validate(EpisodesValidationSchema.episodeId),
  EpisodeController.getById
)

router.get(
  '/:id/streams',
  validate(EpisodesValidationSchema.episodeId),
  EpisodeController.getStreamsByEpisode
)

router.post('/', validate(EpisodesValidationSchema.episode), EpisodeController.add)

router.patch(
  '/:id',
  validate(EpisodesValidationSchema.episodeId),
  validate(EpisodesValidationSchema.episode),
  EpisodeController.updateById
)

router.delete(
  '/:id',
  validate(EpisodesValidationSchema.episodeId),
  EpisodeController.deleteById
)

export default router
