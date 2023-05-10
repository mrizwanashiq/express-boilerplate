import Joi from 'joi'

export const StreamsValidationSchema = {
  streamId: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  stream: {
    body: Joi.object().keys({
      time: Joi.string().required().min(3).max(50),
      user_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      episode_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  }
}
