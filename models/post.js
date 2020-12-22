import mongoose from 'mongoose'
const {Schema} = mongoose
//investigar algunas terminologias de mongoosejs.com
const postSchema = new Schema ({
    date: { type: Date, default: Date.now },
    title: String,
    body: String
});

export const Post = mongoose.model('Post', postSchema)