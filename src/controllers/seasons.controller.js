import { ErrorCodesMeta } from '../constants/error-codes.js'
import { EpisodeModal } from '../models/episode.js'
import { SeasonModal } from '../models/season.js'
import { SeasonsService } from '../services/index.js'
import { httpResponse } from '../utils/index.js'
import { generateQueryObject } from '../constants/functions.js'

export const SeasonsController = {
  getAll: async (req, res) => {
    try {
      const queryObject = generateQueryObject(SeasonModal, req.query)
      const data = await SeasonsService.getAll(queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getById: async (req, res) => {
    try {
      const data = await SeasonsService.getById(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  add: async (req, res) => {
    try {
      const data = await SeasonsService.add(req.body)
      return httpResponse.CREATED(res, data, 'Season created successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  updateById: async function (req, res) {
    try {
      const data = await SeasonsService.updateById(req.params.id, req.body)
      return httpResponse.SUCCESS(res, data, 'Season updated successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  deleteById: async function (req, res) {
    try {
      const data = await SeasonsService.deleteById(req.params.id)
      return httpResponse.SUCCESS(res, data, 'Season deleted successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getEpisodesBySeason: async function (req, res) {
    try {
      const queryObject = generateQueryObject(EpisodeModal, req.query)
      const data = await SeasonsService.getEpisodesBySeason(req.params.id, queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  }
}
