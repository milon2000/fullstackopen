import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
describe('testing BlogForm component', () => {
    let component;
    let blogFormHandler = jest.fn();
    beforeEach(() => {
        component = render(<BlogForm addNewBlog={blogFormHandler}/>)
    })

    test('testing blogForm componenent', () => {
        const form = component.container.querySelector('form')
        const title = component.container.querySelector('.title')
        const author = component.container.querySelector('.author')
        const url = component.container.querySelector('.url')

        fireEvent.change(title, {
            target: { value: 'Title19' },
          })

          fireEvent.change(author, {
            target: { value: 'Author19' },
          })

          fireEvent.change(url, {
            target: { value: 'url19' },
          })

        fireEvent.submit(form)

    expect(blogFormHandler.mock.calls).toHaveLength(1)
    expect(blogFormHandler.mock.calls[0][0].title).toBe('Title19')
    expect(blogFormHandler.mock.calls[0][0].author).toBe('Author19')
    expect(blogFormHandler.mock.calls[0][0].url).toBe('url19')
    })
})
