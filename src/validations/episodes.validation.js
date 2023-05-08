import Joi from 'joi'

export const EpisodesValidationSchema = {
  episodeId: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  episode: {
    body: Joi.object().keys({
      name: Joi.string().required().min(3).max(50),
      description: Joi.string().required().max(255),
      image: Joi.string().required().max(255), 
      season_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  }
}
