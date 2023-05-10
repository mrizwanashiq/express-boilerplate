import { ErrorCodesMeta } from '../constants/error-codes.js'
import { UserService } from '../services/index.js'
import { httpResponse } from '../utils/index.js'
import { generateQueryObject } from '../constants/functions.js'
import { UserModel } from '../models/user.js'
import { StreamModel } from '../models/stream.js'

export const UserController = {
  getAll: async (req, res) => {
    try {
      const queryObject = generateQueryObject(UserModel, req.query)
      console.log(queryObject)
      const data = await UserService.getAll(queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      console.log(error)
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getById: async (req, res) => {
    try {
      const data = await UserService.getById(req.params.id)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  register: async (req, res) => {
    try {
      const data = await UserService.register(req.body)
      return httpResponse.CREATED(res, data, 'User created successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  login: async (req, res) => {
    try {
      const data = await UserService.login(req.body)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  updateById: async function (req, res) {
    try {
      const data = await UserService.updateById(req.params.id, req.body)
      return httpResponse.SUCCESS(res, data, 'User updated successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  deleteById: async function (req, res) {
    try {
      const data = await UserService.deleteById(req.params.id)
      return httpResponse.SUCCESS(res, data, 'User deleted successfully')
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },
  getAllStreams: async function (req, res) {
    try {
      const queryObject = generateQueryObject(StreamModel, req.query)
      const data = await UserService.getAllStreams(req.params.id, queryObject)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  getStream: async function (req, res) {
    try {
      const data = await UserService.getStream(req.param.id, req.param.streamId)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  },

  deleteStream: async function (req, res) {
    try {
      const data = await UserService.deleteStream(req.param.streamId)
      return httpResponse.SUCCESS(res, data)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, {}, error.message)
    }
  }
}
