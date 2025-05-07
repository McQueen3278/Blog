import {Schema, model} from 'mongoose';

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    professor: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        default: 'true',
    },
   },   {
        versionKey: false,
        timeStamps: true
    })
    

export default model('Course', courseSchema)