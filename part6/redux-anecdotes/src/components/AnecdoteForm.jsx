import { useDispatch } from 'react-redux';
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotifiation } from '../reducers/notificationReducer';

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value;
    dispatch(setNotification(`you added ${content}`))
    setTimeout(() => {
      dispatch(clearNotifiation())
    }, 5000)
    
    dispatch(createAnecdote(content));
    
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