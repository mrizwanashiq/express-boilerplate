import mongoose from 'mongoose'
const schema = mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50, unique: true},
    description: { type: String, required: true, maxlength: 255 },
    trailer: { type: String, required: true, maxlength: 255 },
    releas_date: { type: String, required: true, maxlength: 255 },
    image: { type: String, required: true, maxlength: 255 },
    rating: { type: Number, required: true},
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }
  },
  { timestamps: true }
)
export const SeriesModel = mongoose.model('Series', schema)
