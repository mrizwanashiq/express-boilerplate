import express from 'express'
import { UserValidationSchema } from '../validations/index.js'
import { validate, authenticate } from '../middleware/index.js'
import { UserController } from '../controllers/index.js'

const router = express.Router()

router.get('/', authenticate, UserController.getAll)

router.get(
  '/:id',
  authenticate,
  validate(UserValidationSchema.userId),
  UserController.getById
)

router.delete(
  '/:id',
  authenticate,
  validate(UserValidationSchema.userId),
  UserController.deleteById
)

router.get(
  '/:id/streams',
  authenticate,
  validate(UserValidationSchema.userId),
  UserController.getAllStreams
)

router.get(
  '/:id/streams/:streamId',
  authenticate,
  validate(UserValidationSchema.userAndStreamId),
  UserController.getStream
)

router.delete(
  '/:id/streams/:streamId',
  authenticate,
  validate(UserValidationSchema.userAndStreamId),
  UserController.deleteStream
)

router.patch(
  '/:id',
  authenticate,
  validate(UserValidationSchema.userId),
  validate(UserValidationSchema.user),
  UserController.updateById
)

router.post(
  '/register',
  validate(UserValidationSchema.register),
  UserController.register
)

router.post(
  '/login',
  validate(UserValidationSchema.login),
  UserController.login
)

export default router


