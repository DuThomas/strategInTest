import mongoose, { Schema, model } from 'mongoose'

const taskSchema = new Schema({
	id: {
		type: Number,
		unique: true,
		required: true
	},
	project_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	start_date: {
		type: Date,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	progress: {
		type: Number,
		default: 0
	}
})

export default model('Task', taskSchema)