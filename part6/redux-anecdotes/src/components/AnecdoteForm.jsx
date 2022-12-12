import { useDispatch } from 'react-redux';
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotifiation } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {

    const dispatch = useDispatch()
    
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value;
    dispatch(setNotification(`you added ${content}`))
    setTimeout(() => {
      dispatch(clearNotifiation())
    }, 5000)
    
    const newAnecdote = await (anecdoteService.createNew(content))
    dispatch(createAnecdote(newAnecdote))
    //dispatch(createAnecdote(content));
    
    event.target.anecdote.value = ''
  }

  return (
    <div>
        <h2>create new</h2>
            <form onSubmit = {addAnecdote}>
              <div><input name = "anecdote"/></div>
              <button type = "submit">create</button>
            </form>
    </div>
  )
}

export default AnecdoteForm