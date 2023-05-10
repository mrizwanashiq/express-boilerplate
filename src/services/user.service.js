import { StreamModel, UserModel } from '../models/index.js'
import passwordHash from 'password-hash'
import Jwt from 'jsonwebtoken'
import { ErrorCodesMeta } from '../constants/error-codes.js'

export const UserService = {
  getAll: async queryObject => {
    return UserModel.find(queryObject.filter)
      .sort(queryObject.sort)
      .skip(queryObject.skip)
      .limit(queryObject.limit)
      .exec()
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
    if (!user) throw ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL
    queryObject.filter.user_id = userId
    return await StreamModel.find(queryObject.filter)
      .sort(queryObject.sort)
      .skip(queryObject.skip)
      .limit(queryObject.limit)
      .exec()
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
