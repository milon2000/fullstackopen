import {
  createSlice
} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/*const initialState = [{
    content: 'If it hurts, do it more often',
    votes: 0,
    id: 1
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0,
    id: 2
  },
  {
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
    id: 3
  },
  {
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
    id: 4
  },
  {
    content: 'Premature optimization is the root of all evil.',
    votes: 0,
    id: 5
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
    id: 6
  }
] */

//const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
        id: getId(),
      })
    },*/
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    vote(state, action) {
      const id = action.payload
      //console.log(id)
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdotes = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdotes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      state.push(action.payload)
    }
  }
})

export const {
  createAnecdote,
  vote,
  appendAnecdote,
  setAnecdotes
} = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdoteSlice.reducer