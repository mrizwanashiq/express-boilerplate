import { ErrorCodesMeta } from '../constants/error-codes.js'
import { EpisodesService } from '../services/index.js'
import { httpResponse } from '../utils/index.js'

export const EpisodeController = {
  getAll: async (req, res) => {
    try {
      const data = await EpisodesService.getAll()
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getById: async (req, res) => {
    try {
      const data = await EpisodesService.getById(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  add: async (req, res) => {
    try {
      const data = await EpisodesService.add(req.body)
      return httpResponse.CREATED(res, data, 'Episode created successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  updateById: async function (req, res) {
    try {
      const data = await EpisodesService.updateById(req.params.id, req.body)
      return httpResponse.SUCCESS(res, data, 'Episode updated successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  deleteById: async function (req, res) {
    try {
      const data = await EpisodesService.deleteById(req.params.id)
      return httpResponse.SUCCESS(res, data, 'Episode deleted successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getStreamsByEpisode: async function (req, res) {
    try {
      const data = await EpisodesService.getStreamsByEpisode(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  }
}
