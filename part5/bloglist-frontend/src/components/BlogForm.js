import React from 'react'

const BlogForm = ({newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange, addBlog }) => {
    return (
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
    )
}

export default BlogForm