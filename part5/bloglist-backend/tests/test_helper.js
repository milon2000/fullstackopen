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

/*const nonExistingId = async () => {
  const blog = new blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
} */

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}