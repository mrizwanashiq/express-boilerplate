import {
  GenreModal,
  SeasonModal,
  SeriesModel,
  StreamModel
} from '../models/index.js'
import { ErrorCodesMeta } from '../constants/error-codes.js'

export const GenreService = {
  getAll: async () => {
    return GenreModal.find()
  },

  getById: async id => {
    const genre = await GenreModal.findById(id)
    return returnObjectOrError(genre)
  },

  add: async body => {
    const alreadyExistst = await GenreModal.findOne({ name: body.name })
    if (alreadyExistst) {
      throw ErrorCodesMeta.ALREADY_EXISTS
    }
    const genre = await GenreModal.create(body)
    return returnObjectOrError(genre)
  },

  updateById: async (id, body) => {
    const genre = await GenreModal.findByIdAndUpdate(id, body, { new: true })
    return returnObjectOrError(genre)
  },

  deleteById: async id => {
    const genre = await GenreModal.findByIdAndDelete(id)
    return returnObjectOrError(genre)
  },

  getSeriesByGenre: async genreId => {
    const genre = await GenreModal.findById(genreId)
    if (!genre) throw ErrorCodesMeta.NOT_FOUND
    return await SeriesModel.find({ genre_id: genreId })
  },

  getSeasonsByGenre: async genreId => {
    const seasons = []
    const genre = await GenreModal.findById(genreId)
    if (!genre) throw ErrorCodesMeta.NOT_FOUND
    const series = await SeriesModel.find({ genre_id: genre.id })
    for (const item of series) {
      const season = await SeasonModal.find({ series_id: item.id })
      season.forEach(s => seasons.push(s))
    }
    return seasons
  }
}
function returnObjectOrError (obj) {
  if (obj) {
    return obj
  } else {
    throw ErrorCodesMeta.NOT_FOUND
  }
}
