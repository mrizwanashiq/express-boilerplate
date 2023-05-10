import { EpisodeModal, SeasonModal, SeriesModel } from '../models/index.js'
import { ErrorCodesMeta } from '../constants/error-codes.js'

export const SeasonsService = {
  getAll: async queryObject => {
    return SeasonModal.find(queryObject.filter)
      .sort(queryObject.sort)
      .skip(queryObject.skip)
      .limit(queryObject.limit)
      .exec()
  },

  getById: async id => {
    const season = await SeasonModal.findById(id)
    return returnObjectOrError(season)
  },

  add: async body => {
    const seriesExists = await SeriesModel.findById(body.series_id)
    if (!seriesExists) {
      throw ErrorCodesMeta.NOT_FOUND
    }
    const alreadyExistst = await SeasonModal.findOne({ name: body.name })
    if (alreadyExistst) {
      throw ErrorCodesMeta.ALREADY_EXISTS
    }
    const season = await SeasonModal.create(body)
    return returnObjectOrError(season)
  },

  updateById: async (id, body) => {
    const season = await SeasonModal.findByIdAndUpdate(id, body, { new: true })
    return returnObjectOrError(season)
  },

  deleteById: async id => {
    const season = await SeasonModal.findByIdAndDelete(id)
    return returnObjectOrError(season)
  },

  getEpisodesBySeason: async (seasonId, queryObject) => {
    const season = await SeasonModal.findById(seasonId)
    if (!season) throw ErrorCodesMeta.NOT_FOUND
    const episodes = await EpisodeModal.find({
      season_id: season.id,
      ...queryObject.filter
    })
      .sort(queryObject.sort)
      .skip(queryObject.skip)
      .limit(queryObject.limit)
      .exec()

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
