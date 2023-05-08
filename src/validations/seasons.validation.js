import Joi from 'joi'

export const SeasonsValidationSchema = {
  seasonId: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  season: {
    body: Joi.object().keys({
      name: Joi.string().required().min(3).max(50),
      description: Joi.string().required().max(255), 
      series_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  }
}
