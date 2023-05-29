import { Schema, model } from 'mongoose'

const projectSchema = new Schema({
	title: {
		type: String,
		required: true
	}
})

export default model('Project', projectSchema)