import Joi from 'joi'

export const UserValidationSchema = {
  userId: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  userAndStreamId: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      streamId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  user: {
    body: Joi.object().keys({
      first_name: Joi.string().required().min(3).max(50),
      last_name: Joi.string().required().min(3).max(50),
      email: Joi.string().required().email().max(50)
    })
  },
  register: {
    body: Joi.object().keys({
      first_name: Joi.string().required().min(3).max(50),
      last_name: Joi.string().required().min(3).max(50),
      email: Joi.string().required().email().max(50),
      password: Joi.string().required().min(6).max(50)
    })
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().required().email().max(50),
      password: Joi.string().required()
    })
  }
}
