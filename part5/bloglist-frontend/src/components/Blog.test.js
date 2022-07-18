import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Title18',
        author: 'Author18'
    }

    const { container } = render(<Blog blog={blog}/>)
    //screen.debug()
    const element = container.querySelector('.blog-title')
    const element_author = container.querySelector('.blog-author')
    expect(element).toHaveTextContent('Title18')
    expect(element_author).toHaveTextContent('Author18')
})


