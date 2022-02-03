import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newBlog, setNewBlog] = useState('')
  
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('root')
  const [password, setPassword] = useState('123456')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
        })
  }
  const loginForm = () => (
    <LoginForm username = {username}
    password={password}
    handleUsernameChange={({target}) => setUsername(target.value)}
    handlePasswordChange={({target}) => setPassword(target.value)}
    handleSubmit={handleLogin}/>
  )
    
  return (
    <div>
      <Notification message={errorMessage}/>
      {user === null ?
      loginForm() :
      <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>}
      <div>
        <h2>create new</h2>
        <form onSubmit = {addBlog}>
          <div>
            title
              <input 
              type = "text" 
              value = {newTitle} 
              onChange = {handleTitleChange}></ input>
          </div>
          
          <div>
             author
              <input 
                type = "text" 
                value = {newAuthor} 
                onChange = {handleAuthorChange}></ input>
          </div>

          <div>
             url
              <input 
                type = "text" 
                value = {newUrl}
                onChange = {handleUrlChange}></ input>
          </div>
            <button type = "submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default App