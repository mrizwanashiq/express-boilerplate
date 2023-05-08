import {
  EpisodeModal,
  GenreModal,
  SeasonModal,
  SeriesModel
} from '../models/index.js'
import { ErrorCodesMeta } from '../constants/error-codes.js'

export const SeriesService = {
  getAll: async () => {
    return SeriesModel.find()
  },

  getById: async id => {
    const series = await SeriesModel.findById(id)
    return returnObjectOrError(series)
  },

  add: async body => {
    const genreExists = await GenreModal.findById(body.genre_id)
    if (!genreExists) {
      throw ErrorCodesMeta.NOT_FOUND
    }
    const alreadyExistst = await SeriesModel.findOne({ name: body.name })
    if (alreadyExistst) {
      throw ErrorCodesMeta.ALREADY_EXISTS
    }
    const series = await SeriesModel.create(body)
    return returnObjectOrError(series)
  },

  updateById: async (id, body) => {
    const series = await SeriesModel.findByIdAndUpdate(id, body, { new: true })
    return returnObjectOrError(series)
  },

  deleteById: async id => {
    const series = await SeriesModel.findByIdAndDelete(id)
    return returnObjectOrError(series)
  },

  getSeasonsBySeries: async seriesId => {
    const series = await SeriesModel.findById(seriesId)
    if (!series) throw ErrorCodesMeta.NOT_FOUND
    return await SeasonModal.find({ series_id: seriesId })
  },

  getEpisodesBySeries: async seriesId => {
    const episodes = []
    const series = await SeriesModel.findById(seriesId)
    if (!series) throw ErrorCodesMeta.NOT_FOUND
    const seasons = await SeasonModal.find({ series_id: series.id })
    for (const item of seasons) {
      const episode = await EpisodeModal.find({ seasons_id: item.id })
      episode.forEach(e => episodes.push(e))
    }
    return episodes
  }
}
function returnObjectOrError (obj) {
  if (obj) {
    return obj
  } else {
    throw ErrorCodesMeta.NOT_FOUND
  }
}
