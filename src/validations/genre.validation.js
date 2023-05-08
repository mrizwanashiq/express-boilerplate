import Joi from 'joi'

export const GenreValidationSchema = {
  genreId: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  genre: {
    body: Joi.object().keys({
      name: Joi.string().required().min(3).max(50)
    })
  }
}
