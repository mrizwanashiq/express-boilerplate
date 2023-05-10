import { StreamModel, UserModel } from '../models/index.js'
import passwordHash from 'password-hash'
import Jwt from 'jsonwebtoken'
import { ErrorCodesMeta } from '../constants/error-codes.js'
import mongoose from 'mongoose'

export const UserService = {
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
    if (queryObject.first_name) {
      if (typeof queryObject.first_name !== 'object') {
        pipeline.push({
          $match: {
            first_name: queryObject.first_name
          }
        })
      }
    }
    if (queryObject.last_name) {
      if (typeof queryObject.last_name !== 'object') {
        pipeline.push({
          $match: {
            last_name: queryObject.last_name
          }
        })
      }
    }
    if (queryObject.email) {
      if (typeof queryObject.email !== 'object') {
        pipeline.push({
          $match: {
            email: queryObject.email
          }
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
            { first_name: { $regex: queryObject.s, $options: 'i' } },
            { last_name: { $regex: queryObject.s, $options: 'i' } },
            { email: { $regex: queryObject.s, $options: 'i' } }
          ]
        }
      })
    }
    console.log(pipeline)
    if (pipeline.length > 0) {
      return await UserModel.aggregate(pipeline)
    } else {
      return await UserModel.find()
    }
    // return UserModel.find(queryObject.filter)
    //   .sort(queryObject.sort)
    //   .skip(queryObject.skip)
    //   .limit(queryObject.limit)
    //   .exec()
  },

  getById: async id => {
    const user = await UserModel.findById(id)
    return returnObjectOrError(user)
  },

  deleteById: async id => {
    const user = await UserModel.findByIdAndDelete(id)
    return returnObjectOrError(user)
  },

  register: async body => {
    const isNewUser = await UserModel.findOne({ email: body.email })
    if (isNewUser) {
      throw ErrorCodesMeta.USER_ALREADY_EXISTS
    }
    body.password = passwordHash.generate(body.password)
    var user = await UserModel.create(body)
    delete user.password
    return {
      user: user,
      token: Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })
    }
  },

  login: async body => {
    const user = await UserModel.findOne({ email: body.email })
    if (!user) {
      throw ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL
    } else if (!passwordHash.verify(body.password, user.password)) {
      throw ErrorCodesMeta.INVALID_CREDENTIALS
    } else {
      delete user.password
      return {
        user: user,
        token: Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7days'
        })
      }
    }
  },

  updateById: async (id, body) => {
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true })
    return returnObjectOrError(user)
  },

  getAllStreams: async (userId, queryObject) => {
    const user = await UserModel.findById(userId)
    if (!user) throw ErrorCodesMeta.NOT_FOUND

    const pipeline = []
    const page = queryObject.page || 1
    const limit = queryObject.limit || 10
    pipeline.push({
      $limit: limit
    })
    pipeline.push({
      $skip: (page - 1) * limit
    })
    if (queryObject.streamId) {
      pipeline.push({
        $match: { _id: queryObject.streamId }
      })
    } else {
      pipeline.push({
        $match: { user_id: userId }
      })
    }

    if (queryObject.time) {
      if (typeof queryObject.time === 'object') {
        if (queryObject.time.gt) {
          pipeline.push({
            $match: {
              time: { $gt: parseInt(queryObject.time.gt) }
            }
          })
        }
        if (queryObject.time.lt) {
          pipeline.push({
            $match: {
              time: { $lt: parseInt(queryObject.time.lt) }
            }
          })
        }
        if (queryObject.time.gte) {
          pipeline.push({
            $match: {
              time: { $gte: parseInt(queryObject.time.gte) }
            }
          })
        }
        if (queryObject.time.lte) {
          pipeline.push({
            $match: {
              time: { $lte: parseInt(queryObject.time.lte) }
            }
          })
        }
      } else {
        pipeline.push({
          $match: { time: parseInt(queryObject.time) }
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
        $match: { time: parseInt(queryObject.s) }
      })
    }
    if (pipeline.length > 0) {
      return await StreamModel.aggregate(pipeline)
    } else {
      return await StreamModel.find({ user_id: userId })
    }
    // queryObject.filter.user_id = userId
    // return await StreamModel.find(queryObject.filter)
    //   .sort(queryObject.sort)
    //   .skip(queryObject.skip)
    //   .limit(queryObject.limit)
    //   .exec()
  },

  getStream: async (userId, streamId) => {
    const user = await UserModel.findById(userId)
    if (!user) throw ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL
    return await StreamModel.findOne({ user_id: userId, stream_id: streamId })
  },

  deleteStream: async streamId => {
    const stream = await StreamModel.findByIdAndDelete(streamId)
    return returnObjectOrError(stream)
  }
}

function returnObjectOrError (obj) {
  if (obj) {
    return obj
  } else {
    throw ErrorCodesMeta.NOT_FOUND
  }
}
