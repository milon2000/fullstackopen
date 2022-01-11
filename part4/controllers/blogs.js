const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
    /*Blog.find({}).then(blogs => {
        response.json(blogs)
    })*/
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    /*if (body.title === undefined) {
        return response.status(400)
    }*/
    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
})

module.exports = blogsRouter