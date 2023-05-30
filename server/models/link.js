import mongoose, { Schema, model } from 'mongoose'

const linkSchema = new Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    source: {
        type: Number,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
})

export default model('Link', linkSchema)