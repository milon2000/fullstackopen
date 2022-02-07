import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('root')
  const [password, setPassword] = useState('123456')
  const [user, setUser] = useState(null)




  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //app spr czy dane logowania sa w local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('You are logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('wylogowany')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    //window.localStorage.clear()
  }

  const addNewBlog = async (returnedBlog) => {
    
    try {
      const createdBlog = await blogService
        .create(returnedBlog)
        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added `)
        setBlogs(blogs.concat(createdBlog))
        setErrorMessage('') 
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      
    } catch (exception) {
      setErrorMessage(' something went wrong')
      setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    } 
  } 

  const loginForm = () => {
   
    return (
      <div>
          <LoginForm username = {username}
            password={password}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      </div>
      
    )
    }
const blogForm = () => {
  return (
      <Togglable buttonLabel="create new blog">
        <BlogForm 
          addNewBlog = {addNewBlog}
        />
      </Togglable> 
  )
}
    
  return (
    <div>
      <Notification message={errorMessage}/>
      {user === null ?
      loginForm() :
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick = {handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        {blogForm()}
      </div>}
    </div>
  )
}

export default App