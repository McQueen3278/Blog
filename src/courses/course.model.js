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
    couurseImage:{
        type: String,
        required: false,
    },
    document: [{
        fileName: String,
        filePath: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
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