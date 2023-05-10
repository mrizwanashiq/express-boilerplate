import mongoose from 'mongoose'
const schema = mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50, unique: true},
    description: { type: String, required: true, maxlength: 255 },
    image: { type: String, required: true, maxlength: 255 },
    season_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Season' }
  },
  { timestamps: true }
)
export const EpisodeModal = mongoose.model('Episode', schema)
