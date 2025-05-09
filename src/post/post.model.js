import {Schema, model} from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      document: {
        type: String,
        required: true,
      },
      course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
      uploadAt: {
        type: Date,
        default: Date.now,
      },
},   {
        versionKey: false,
        timeStamp: true
    })

export default model('Post', postSchema)            
