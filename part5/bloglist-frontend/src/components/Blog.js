import React,  { useState } from 'react'

const Blog = ({blog, handleLikes, handleRemove}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  const [showAll, setShowAll] = useState(false)

  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }


  return (
    <div style = {blogStyle}>
      <div style ={hideWhenVisible}>
        <p className='blog-title'>{blog.title}</p> 
        <p className='blog-author'>{blog.author}</p>
        <button onClick ={() => setShowAll(true)}>show</button>
      </div>
      <div style ={showWhenVisible}>
      <p className='blog-title'>{blog.title}</p> 
        <p className='blog-author'>{blog.author}</p>
        <p>{blog.url}</p> 
        <div>
        <p>{blog.likes}</p> 
        <button className='addLike' onClick={handleLikes}>like</button>
        </div>
        <button onClick ={() => setShowAll(false)}>hide</button>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>  
  )
}

export default Blog
