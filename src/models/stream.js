import mongoose from 'mongoose'
const schema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    episode_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode' },
    time: { type: String, required: true, maxlength: 50 }
  },
  { timestamps: true }
)
export const StreamModel = mongoose.model('Stream', schema)
