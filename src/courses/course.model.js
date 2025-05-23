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
    courseImage:{
        type: String,
        required: false,
    },
    documents: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    status: {
        type: Boolean,
        default: 'true',
    },
   },   {
        versionKey: false,
        timeStamps: true
    })
    

export default model('Course', courseSchema)