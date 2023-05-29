import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
	// project_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Project',
  //   required: true
  // },
	project_id: {
    type: Number,
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
	}
})

export default model('Task', taskSchema)