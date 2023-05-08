import { SeasonModal, EpisodeModal, StreamModel } from '../models/index.js'
import { ErrorCodesMeta } from '../constants/error-codes.js'

export const EpisodesService = {
  getAll: async () => {
    return EpisodeModal.find()
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

  getStreamsByEpisode: async episodeId => {
    const episode = await EpisodeModal.findById(episodeId)
    if (!episode) throw ErrorCodesMeta.NOT_FOUND
    const streams = await StreamModel.find({ episode_id: episode.id })

    return streams
  }
}
function  returnObjectOrError (obj) {
  if (!obj) {
    throw ErrorCodesMeta.NOT_FOUND
  } else {
    return obj
  }
}
