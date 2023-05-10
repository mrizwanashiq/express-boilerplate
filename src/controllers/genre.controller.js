import { ErrorCodesMeta } from '../constants/error-codes.js'
import { GenreModal } from '../models/genre.js'
import { SeasonModal } from '../models/season.js'
import { SeriesModel } from '../models/series.js'
import { GenreService } from '../services/index.js'
import { httpResponse } from '../utils/index.js'
import { generateQueryObject } from '../constants/functions.js'

export const GenreController = {
  getAll: async (req, res) => {
    try {
      const queryObject = generateQueryObject(GenreModal, req.query)
      const data = await GenreService.getAll(queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getById: async (req, res) => {
    try {
      const data = await GenreService.getById(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  add: async (req, res) => {
    try {
      const data = await GenreService.add(req.body)
      return httpResponse.CREATED(res, data, 'Genre created successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  updateById: async function (req, res) {
    try {
      const data = await GenreService.updateById(req.params.id, req.body)
      return httpResponse.SUCCESS(res, data, 'Genre updated successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  deleteById: async function (req, res) {
    try {
      const data = await GenreService.deleteById(req.params.id)
      return httpResponse.SUCCESS(res, data, 'Genre deleted successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getSeriesByGenre: async function (req, res) {
    try {
      const queryObject = generateQueryObject(SeriesModel, req.query)
      const data = await GenreService.getSeriesByGenre(req.params.id, queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getSeasonsByGenre: async function (req, res) {
    try {
      const queryObject = generateQueryObject(SeasonModal, req.query)
      const data = await GenreService.getSeasonsByGenre(req.params.id, queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  }
}
