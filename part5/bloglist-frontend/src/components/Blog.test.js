import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
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
let mockHandler = jest.fn();

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

test('the like button is clicked twice', () => {
    
    const button = component.container.querySelector('.addLike')
    fireEvent.click(button)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})

    
})








