import express from 'express'

// routes
import userRoute from './user.route.js'
import genreRoute from './genre.route.js'
import seriesRoute from './series.route.js'
import seasonsRoute from './seasons.route.js'
import episodeRoute from './episodes.route.js'
import streamsRoute from './streams.route.js'

const protectedRouter = express.Router()
const unProtectedRouter = express.Router()

// Protected Routes
protectedRouter.use('/genres', genreRoute)
protectedRouter.use('/series', seriesRoute)
protectedRouter.use('/seasons', seasonsRoute)
protectedRouter.use('/episodes', episodeRoute)
protectedRouter.use('/streams', streamsRoute)
// Un-Protected Routes
unProtectedRouter.use('/users', userRoute)

export { protectedRouter, unProtectedRouter }
