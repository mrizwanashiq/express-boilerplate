import {
  EpisodeModal,
  GenreModal,
  SeasonModal,
  SeriesModel
} from '../models/index.js'
import { ErrorCodesMeta } from '../constants/error-codes.js'
import mongoose from 'mongoose'

export const SeriesService = {
  getAll: async queryObject => {
    const pipeline = []
    const page = queryObject.page || 1
    const limit = queryObject.limit || 10
    pipeline.push({
      $limit: limit
    })
    pipeline.push({
      $skip: (page - 1) * limit
    })
    if (queryObject.name) {
      if (typeof queryObject.name !== 'object') {
        pipeline.push({
          $match: { name: queryObject.name }
        })
      }
    }
    if (queryObject.descrption) {
      if (typeof queryObject.descrption !== 'object') {
        pipeline.push({
          $match: { descrption: queryObject.descrption }
        })
      }
    }

    if (queryObject.trailer) {
      if (typeof queryObject.trailer !== 'object') {
        pipeline.push({
          $match: { trailer: queryObject.trailer }
        })
      }
    }
    if (queryObject.startDate) {
      if (typeof queryObject.startDate !== 'object') {
        pipeline.push({
          $match: {
            releas_date: {
              $gte: queryObject.startDate
            }
          }
        })
      }
    }
    if (queryObject.endDate) {
      if (typeof queryObject.startDate !== 'object') {
        pipeline.push({
          $match: {
            releas_date: {
              $lte: queryObject.endDate
            }
          }
        })
      }
    }

    if (queryObject.image) {
      if (typeof queryObject.image !== 'object') {
        pipeline.push({
          $match: { image: queryObject.image }
        })
      }
    }
    if (queryObject.rating) {
      if (typeof queryObject.rating === 'object') {
        if (queryObject.rating.gt) {
          pipeline.push({
            $match: {
              rating: { $gt: queryObject.rating }
            }
          })
        }
        if (queryObject.rating.lt) {
          pipeline.push({
            $match: {
              rating: { $lt: queryObject.rating }
            }
          })
        }
        if (queryObject.rating.gte) {
          pipeline.push({
            $match: {
              rating: { $gte: queryObject.rating }
            }
          })
        }
        if (queryObject.rating.lte) {
          pipeline.push({
            $match: {
              rating: { $lte: queryObject.rating }
            }
          })
        }
      } else {
        pipeline.push({
          $match: { rating: queryObject.rating }
        })
      }
    }
    if (queryObject.sort) {
      const sort = {}
      if (Array.isArray(queryObject.sort)) {
        queryObject.sort.forEach(sortOption => {
          const sortOrder = sortOption.startsWith('-') ? -1 : 1
          const sortField = sortOption.replace(/^-/, '')

          sort[sortField] = sortOrder
        })
        pipeline.push({
          $sort: sort
        })
      } else {
        const sortOrder = queryObject.sort.startsWith('-') ? -1 : 1
        const sortField = queryObject.sort.replace(/^-/, '')
        sort[sortField] = sortOrder
        pipeline.push({ $sort: sort })
      }
    }
    if (queryObject.s) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: queryObject.s, $options: 'i' } },
            { descrption: { $regex: queryObject.s, $options: 'i' } },
            { trailer: { $regex: queryObject.s, $options: 'i' } },
            { releas_date: { $regex: queryObject.s, $options: 'i' } },
            { image: { $regex: queryObject.s, $options: 'i' } }
          ]
        }
      })
    }
    if (pipeline.length > 0) {
      return await SeriesModel.aggregate(pipeline).exec()
    } else {
      return await SeriesModel.find()
    }
    // return SeriesModel.find(queryObject.filter)
    //   .sort(queryObject.sort)
    //   .skip(queryObject.skip)
    //   .limit(queryObject.limit)
    //   .exec()
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

  getSeasonsBySeries: async (seriesId, queryObject) => {
    const series = await SeriesModel.findById(seriesId)
    if (!series) throw ErrorCodesMeta.NOT_FOUND
    const page = queryObject.page || 1
    const limit = queryObject.limit || 10
    pipeline.push({
      $limit: limit
    })
    pipeline.push({
      $skip: (page - 1) * limit
    })
    const pipeline = []
    if (queryObject.seasonId) {
      pipeline.push({
        $match: { _id: mongoose.Types.ObjectId(queryObject.seasonId) }
      })
    } else {
      pipeline.push({
        $match: { series_id: mongoose.Types.ObjectId(seriesId) }
      })
    }
    if (queryObject.name) {
      if (queryObject.name !== 'object') {
        pipeline.push({
          $match: { name: queryObject.name }
        })
      }
    }
    if (queryObject.descrption) {
      if (queryObject.descrption !== 'object') {
        pipeline.push({
          $match: { descrption: queryObject.descrption }
        })
      }
    }

    if (queryObject.sort) {
      const sort = {}
      if (Array.isArray(queryObject.sort)) {
        queryObject.sort.forEach(sortOption => {
          const sortOrder = sortOption.startsWith('-') ? -1 : 1
          const sortField = sortOption.replace(/^-/, '')

          sort[sortField] = sortOrder
        })
        pipeline.push({
          $sort: sort
        })
      } else {
        const sortOrder = queryObject.sort.startsWith('-') ? -1 : 1
        const sortField = queryObject.sort.replace(/^-/, '')
        sort[sortField] = sortOrder
        pipeline.push({ $sort: sort })
      }
    }
    if (queryObject.s) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: queryObject.s, $options: 'i' } },
            { descrption: { $regex: queryObject.s, $options: 'i' } }
          ]
        }
      })
    }
    console.log(pipeline)
    if (pipeline.length > 0) {
      return await SeasonModal.aggregate(pipeline).exec()
    } else {
      return await SeasonModal.find()
    }

    // queryObject.filter.series_id = seriesId
    // return await SeasonModal.find(queryObject.filter)
    //   .sort(queryObject.sort)
    //   .skip(queryObject.skip)
    //   .limit(queryObject.limit)
    //   .exec()
  },

  getEpisodesBySeries: async (seriesId, queryObject) => {
    const episodes = []
    const series = await SeriesModel.findById(seriesId)
    if (!series) throw ErrorCodesMeta.NOT_FOUND
    const seasons = await SeasonModal.find({ series_id: series.id })
    for (const item of seasons) {
      const pipeline = []
      const page = queryObject.page || 1
      const limit = queryObject.limit || 10
      pipeline.push({
        $limit: limit
      })
      pipeline.push({
        $skip: (page - 1) * limit
      })
      if (queryObject.episodeId) {
        pipeline.push({
          $match: { _id: mongoose.Types.ObjectId(queryObject.episodeId) }
        })
      } else {
        pipeline.push({
          $match: { season_id: mongoose.Types.ObjectId(item.id) }
        })
      }
      if (queryObject.name) {
        if (typeof queryObject.name !== 'object') {
          pipeline.push({
            $match: { name: queryObject.name }
          })
        }
      }
      if (queryObject.descrption) {
        if (typeof queryObject.descrption !== 'object') {
          pipeline.push({
            $match: { descrption: queryObject.descrption }
          })
        }
      }

      if (queryObject.image) {
        if (typeof queryObject.image !== 'object') {
          pipeline.push({
            $match: { image: queryObject.image }
          })
        }
      }

      if (queryObject.sort) {
        const sort = {}
        if (Array.isArray(queryObject.sort)) {
          queryObject.sort.forEach(sortOption => {
            const sortOrder = sortOption.startsWith('-') ? -1 : 1
            const sortField = sortOption.replace(/^-/, '')

            sort[sortField] = sortOrder
          })
          pipeline.push({
            $sort: sort
          })
        } else {
          const sortOrder = queryObject.sort.startsWith('-') ? -1 : 1
          const sortField = queryObject.sort.replace(/^-/, '')
          sort[sortField] = sortOrder
          pipeline.push({ $sort: sort })
        }
      }
      if (queryObject.s) {
        pipeline.push({
          $match: {
            $or: [
              { name: { $regex: queryObject.s, $options: 'i' } },
              { descrption: { $regex: queryObject.s, $options: 'i' } },
              { image: { $regex: queryObject.s, $options: 'i' } }
            ]
          }
        })
      }
      console.log(pipeline)
      let episodesPerSeason = []
      if (pipeline.length > 0) {
        episodesPerSeason = await EpisodeModal.aggregate(pipeline).exec()
      } else {
        episodesPerSeason = await EpisodeModal.find()
      }
      episodesPerSeason.forEach(e => episodes.push(e))
      // const episode = await EpisodeModal.find({
      //   seasons_id: item.id,
      //   ...queryObject.filter
      // })
      //   .sort(queryObject.sort)
      //   .skip(queryObject.skip)
      //   .limit(queryObject.limit)
      //   .exec()
      // episode.forEach(e => episodes.push(e))
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
