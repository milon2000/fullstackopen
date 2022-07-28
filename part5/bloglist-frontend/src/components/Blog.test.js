import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog componenet', () => {
    const blog = {
        title: 'Title18',
        author: 'Author18',
        url: 'www.18.com',
        likes: 18
    }
let component;

beforeEach(() => {
    component = render(<Blog blog={blog}/>)
})

test('renders content', () => {

    //screen.debug()
    const element = component.container.querySelector('.blog-title')
    const element_author = component.container.querySelector('.blog-author')
    expect(element).toHaveTextContent('Title18')
    expect(element_author).toHaveTextContent('Author18')
})

test('url and number of likes on a click', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('www.18.com')
    expect(component.container).toHaveTextContent('18')
})
    
})






