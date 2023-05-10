import { SeasonModal, EpisodeModal, StreamModel } from '../models/index.js'
import { ErrorCodesMeta } from '../constants/error-codes.js'

export const EpisodesService = {
  getAll: async queryObject => {
    return EpisodeModal.find(queryObject.filter)
      .sort(queryObject.sort)
      .skip(queryObject.skip)
      .limit(queryObject.limit)
      .exec()
  },

  getById: async id => {
    const episode = await EpisodeModal.findById(id)
    return returnObjectOrError(episode)
  },

  add: async body => {
    const seasonExists = await SeasonModal.findById(body.season_id)
    if (!seasonExists) {
      throw ErrorCodesMeta.NOT_FOUND
    }

    const episode = await EpisodeModal.create(body)
    return returnObjectOrError(episode)
  },

  updateById: async (id, body) => {
    const episode = await EpisodeModal.findByIdAndUpdate(id, body, {
      new: true
    })
    return returnObjectOrError(episode)
  },

  deleteById: async id => {
    const episode = await EpisodeModal.findByIdAndDelete(id)
    return returnObjectOrError(episode)
  },

  getStreamsByEpisode: async (episodeId, queryObject) => {
    const episode = await EpisodeModal.findById(episodeId)
    if (!episode) throw ErrorCodesMeta.NOT_FOUND
    const streams = await StreamModel.find({
      episode_id: episode.id,
      ...queryObject.filter
    })
      .sort(queryObject.sort)
      .skip(queryObject.skip)
      .limit(queryObject.limit)
      .exec()

    return streams
  }
}
function returnObjectOrError (obj) {
  if (!obj) {
    throw ErrorCodesMeta.NOT_FOUND
  } else {
    return obj
  }
}
