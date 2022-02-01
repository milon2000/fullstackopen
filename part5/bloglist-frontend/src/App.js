import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input 
            type = "text"
            value = {username}
            name = "Username"
            onchange = {({target}) => setUsername(target.value)}>
            </input>  
        </div>
        <div>
          password
            <input
            type = "text"
            value = "password"
            name = "Password"
            onchange = {({target}) => setPassword(target.value)}
            ></input>
        </div> 
        <button type = "submit">login</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App