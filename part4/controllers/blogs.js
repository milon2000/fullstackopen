const blogsRouter = require('express').Router()
const {
    response
} = require('express')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
    /*Blog.find({}).then(blogs => {
        response.json(blogs)
    })*/
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})


blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const newBlog = {
        likes: body.likes
    }

    const content = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
        new: true,
    })
    response.json(content)
})


blogsRouter.post('/', async (request, response) => {

    const body = request.body

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


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter