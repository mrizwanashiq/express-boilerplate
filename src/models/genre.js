import mongoose from "mongoose";
const schema = mongoose.Schema(
	{
		name: { type: String, required: true, maxlength: 50 , unique: true}
	},
	{ timestamps: true }
);
export const GenreModal = mongoose.model("Genre", schema);
