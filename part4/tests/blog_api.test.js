const {
    TestWatcher
} = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [{
        title: 'Blog1',
        author: 'Author1',
        url: 'www.url1.com',
        likes: 2
    },
    {
        title: 'Blog2',
        author: 'Author2',
        url: 'www.url2.com',
        likes: 2
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('there are two blogs in the database', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs are in the JSON format', async () => {
    await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)
})