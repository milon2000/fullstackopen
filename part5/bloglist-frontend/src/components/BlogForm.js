import React, { useState } from 'react'

const BlogForm = ({addNewBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
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
    addNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
    return (
        <div>
            <h2>create new</h2>
        <form onSubmit = {addBlog}>
          <div>
            title
              <input className='title'
              type = "text" 
              value = {newTitle} 
              onChange = {handleTitleChange}></ input>
          </div>
          
          <div>
             author
              <input 
                className='author'
                type = "text" 
                value = {newAuthor} 
                onChange = {handleAuthorChange}></ input>
          </div>

          <div>
             url
              <input 
                className='url'
                type = "text" 
                value = {newUrl}
                onChange = {handleUrlChange}></ input>
          </div>
            <button type = "submit">create</button>
        </form>
        </div>
    )
}

export default BlogForm