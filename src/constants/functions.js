import mongoose from 'mongoose'

export function generateQueryObject (model, queryParams) {
  const filter = {}

  Object.keys(queryParams).forEach(key => {
    if (key === 's') {
      const orConditions = []
      model.schema.eachPath((path, type) => {
        if (type instanceof mongoose.Schema.Types.String) {
          if (Array.isArray(queryParams[key])) {
            orConditions.push({
              [path]: { $in: queryParams[key] }
            })
          } else {
            orConditions.push({
              [path]: { $regex: queryParams[key], $options: 'i' }
            })
          }
        }
      })
      filter.$or = orConditions
    } else if (key === 'sort') {
      const sort = {}

      if (Array.isArray(queryParams[key])) {
        queryParams[key].forEach(sortOption => {
          const sortOrder = sortOption.startsWith('-') ? -1 : 1
          const sortField = sortOption.replace(/^-/, '')

          sort[sortField] = sortOrder
        })
      } else {
        const sortOrder = queryParams[key].startsWith('-') ? -1 : 1
        const sortField = queryParams[key].replace(/^-/, '')

        sort[sortField] = sortOrder
      }

      Object.assign(filter, { sort })
    } else {
      if (typeof model.schema.paths[key] !== 'undefined') {
        if (typeof queryParams[key] !== 'object') {
          Object.assign(filter, { [key]: queryParams[key] })
        } else {
          const subFilter = {}
          const isArray = Array.isArray(model.schema.paths[key].instance)

          if (Array.isArray(queryParams[key])) {
            Object.assign(subFilter, { $in: queryParams[key] })
          } else {
            Object.keys(queryParams[key]).forEach(operator => {
              const value = queryParams[key][operator]
              if (isArray) {
                Object.assign(subFilter, { $in: value })
              } else {
                switch (operator) {
                  case 'gt':
                    Object.assign(subFilter, { $gt: value })
                    break
                  case 'gte':
                    Object.assign(subFilter, { $gte: value })
                    break
                  case 'lt':
                    Object.assign(subFilter, { $lt: value })
                    break
                  case 'lte':
                    Object.assign(subFilter, { $lte: value })
                    break
                  case 'ne':
                    Object.assign(subFilter, { $ne: value })
                    break
                  default:
                    Object.assign(subFilter, { $regex: value })
                    break
                }
              }
            })
          }

          Object.assign(filter, { [key]: subFilter })
        }
      }
    }
  })

  const limit = parseInt(queryParams.limit) || 10
  const page = parseInt(queryParams.page) || 1
  const skip = (page - 1) * limit

  return {
    filter: filter,
    sort: filter.sort || { createdAt: -1 },
    limit: limit,
    skip: skip
  }
}
