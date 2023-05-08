import { ErrorCodesMeta } from '../constants/error-codes.js'
import { SeriesService } from '../services/index.js'
import { httpResponse } from '../utils/index.js'

export const SeriesController = {
  getAll: async (req, res) => {
    try {
      const data = await SeriesService.getAll()
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
      const data = await SeriesService.getSeasonsBySeries(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getEpisodesBySeries: async function (req, res) {
    try {
      const data = await SeriesService.getEpisodesBySeries(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  }
}
