const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI)

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: String,
    author: String,
    url: String,
    likes: Number
})