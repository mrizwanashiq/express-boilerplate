import Joi from 'joi'

export const SeriesValidationSchema = {
  seriesId: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  series: {
    body: Joi.object().keys({
      name: Joi.string().required().min(3).max(50),
      description: Joi.string().required().max(255),
      trailer: Joi.string().required().min(3).max(255),
      releas_date: Joi.string().required().min(3).max(255),
      image: Joi.string().required().min(3).max(255),
      rating: Joi.number().required().min(0).max(10),
      genre_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  }
}
