import {Schema, model} from 'mongoose';

const commentSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status:{
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamp: true,
  });

export default model('Comment', commentSchema);
