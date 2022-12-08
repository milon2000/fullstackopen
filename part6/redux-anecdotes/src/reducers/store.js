import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import anecdoteService from '../services/anecdotes'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notifications: notificationReducer,
    }
  })


  anecdoteService.getAll().then(anecdotes =>
    anecdotes.forEach(anecdote => {
      store.dispatch(setAnecdotes(anecdote))
    })
  )


export default store

