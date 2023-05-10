import { ErrorCodesMeta } from '../constants/error-codes.js'
import { EpisodeModal } from '../models/episode.js'
import { SeasonModal } from '../models/season.js'
import { SeriesModel } from '../models/series.js'
import { SeriesService } from '../services/index.js'
import { httpResponse } from '../utils/index.js'
import { generateQueryObject } from '../constants/functions.js'

export const SeriesController = {
  getAll: async (req, res) => {
    try {
      const queryObject = generateQueryObject(SeriesModel, req.query)
      const data = await SeriesService.getAll(queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getById: async (req, res) => {
    try {
      const data = await SeriesService.getById(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  add: async (req, res) => {
    try {
      const data = await SeriesService.add(req.body)
      return httpResponse.CREATED(res, data, 'Series created successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  updateById: async function (req, res) {
    try {
      const data = await SeriesService.updateById(req.params.id, req.body)
      return httpResponse.SUCCESS(res, data, 'Series updated successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  deleteById: async function (req, res) {
    try {
      const data = await SeriesService.deleteById(req.params.id)
      return httpResponse.SUCCESS(res, data, 'Series deleted successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getSeasonsBySeries: async function (req, res) {
    try {
      const queryObject = generateQueryObject(SeasonModal, req.query)
      const data = await SeriesService.getSeasonsBySeries(req.params.id, queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getEpisodesBySeries: async function (req, res) {
    try {
      const queryObject = generateQueryObject(EpisodeModal, req.query)
      const data = await SeriesService.getEpisodesBySeries(req.params.id, queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  }
}
