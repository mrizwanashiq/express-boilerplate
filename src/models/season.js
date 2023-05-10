import mongoose from 'mongoose'
const schema = mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 , unique: true},
    description: { type: String, required: true, maxlength: 255 },
    series_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' }
  },
  { timestamps: true }
)
export const SeasonModal = mongoose.model('Season', schema)
