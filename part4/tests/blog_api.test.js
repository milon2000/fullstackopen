const {
    response
} = require('express')
const {
    TestWatcher
} = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})


describe('blog api tests', () => {
    test('there are two blogs in the database', async () => {
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs are in the JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect('Content-Type', /application\/json/)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(blog => blog.id)
        expect(contents).toBeDefined()
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Blog3',
            author: 'Author3',
            url: 'www.url3.com',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length + 1)

    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: 'Blog4',
            author: 'Author4',
            url: 'www.url4.com'
        }
        const response =
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const isItDefinied = response.body.likes == undefined ? 0 : 0
        console.log(isItDefinied)
        expect(isItDefinied).toEqual(0)
    })

    test('verify that if the title and url properties are missing from the request data, the server responded with 400', async () => {
        const newBlog = {
            author: 'Author5',
            url: 'www.url5.com',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})