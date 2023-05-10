import { ErrorCodesMeta } from '../constants/error-codes.js'
import { StreamModel } from '../models/stream.js'
import { StreamsService } from '../services/index.js'
import { httpResponse } from '../utils/index.js'
import { generateQueryObject } from '../constants/functions.js'

export const StreamController = {
  getAll: async (req, res) => {
    try {
      const queryObject = generateQueryObject(StreamModel, req.query)
      const data = await StreamsService.getAll(queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getById: async (req, res) => {
    try {
      const data = await StreamsService.getById(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  add: async (req, res) => {
    try {
      const data = await StreamsService.add(req.body)
      return httpResponse.CREATED(res, data, 'Stream created successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  updateById: async function (req, res) {
    try {
      const data = await StreamsService.updateById(req.params.id, req.body)
      return httpResponse.SUCCESS(res, data, 'Stream updated successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  deleteById: async function (req, res) {
    try {
      const data = await StreamsService.deleteById(req.params.id)
      return httpResponse.SUCCESS(res, data, 'Stream deleted successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getUserByStream: async function (req, res) {
    try {
      const data = await StreamsService.getUserByStream(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getEpisodeByStream: async function (req, res) {
    try {
      const data = await StreamsService.getEpisodeByStream(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getSeasonByStream: async function (req, res) {
    try {
      const data = await StreamsService.getSeasonByStream(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getSeriesByStream: async function (req, res) {
    try {
      const data = await StreamsService.getSeriesByStream(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getGenreByStream: async function (req, res) {
    try {
      const data = await StreamsService.getGenreByStream(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  }
}
