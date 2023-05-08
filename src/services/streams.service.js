import {
  UserModel,
  EpisodeModal,
  StreamModel,
  SeasonModal,
  SeriesModel,
  GenreModal
} from '../models/index.js'
import { ErrorCodesMeta } from '../constants/error-codes.js'

export const StreamsService = {
  getAll: async () => {
    return StreamModel.find()
  },

  getById: async id => {
    const stream = await StreamModel.findById(id)
    console.log(stream)
    return returnObjectOrError(stream)
  },

  add: async body => {
    const userExists = await UserModel.findById(body.user_id)
    const episodeExists = await EpisodeModal.findById(body.episode_id)
    if (!userExists || !episodeExists) {
      throw ErrorCodesMeta.NOT_FOUND
    }

    const stream = await StreamModel.create(body)
    return returnObjectOrError(stream)
  },

  updateById: async (id, body) => {
    const stream = await StreamModel.findByIdAndUpdate(id, body, {
      new: true
    })
    return returnObjectOrError(stream)
  },

  deleteById: async id => {
    const stream = await StreamModel.findByIdAndDelete(id)
    return returnObjectOrError(stream)
  },

  getEpisodeByStream: async streamId => {
    const stream = await StreamModel.findById(streamId)
    if (!stream) throw ErrorCodesMeta.NOT_FOUND
    return await EpisodeModal.findById(stream.episode_id)
  },
  getUserByStream: async streamId => {
    const stream = await StreamModel.findById(streamId)
    if (!stream) throw ErrorCodesMeta.NOT_FOUND
    return await UserModel.findById(stream.user_id)
  },
  getSeasonByStream: async streamId => {
    const stream = await StreamModel.findById(streamId)
    if (!stream) throw ErrorCodesMeta.NOT_FOUND
    const episode = await EpisodeModal.findById(stream.episode_id)
    return await SeasonModal.findById(episode.season_id)
  },
  getSeriesByStream: async streamId => {
    const stream = await StreamModel.findById(streamId)
    if (!stream) throw ErrorCodesMeta.NOT_FOUND
    const episode = await EpisodeModal.findById(stream.episode_id)
    const season = await SeasonModal.findById(episode.season_id)
    return await SeriesModel.findById(season.series_id)
  },

  getGenreByStream: async streamId => {
    const stream = await StreamModel.findById(streamId)
    if (!stream) throw ErrorCodesMeta.NOT_FOUND
    const episode = await EpisodeModal.findById(stream.episode_id)
    const season = await SeasonModal.findById(episode.season_id)
    const series = await SeriesModel.findById(season.series_id)
    return await GenreModal.findById(series.genre_id)
  }
}
function returnObjectOrError (obj) {
  console.log(obj)
  if (obj === null || obj === undefined) {
    throw ErrorCodesMeta.NOT_FOUND
  } else {
    return obj
  }
}
