import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotifiation } from '../reducers/notificationReducer';

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const anecdotesSorted = [...anecdotes].sort((a, b) => {
        return b.votes - a.votes
      })
  
    const dispatch = useDispatch()
    const voteId = (content, id) => {
      dispatch(vote(id))
      dispatch(setNotification(`you voted ${content}`))
      setTimeout(() => {
        dispatch(clearNotifiation())
      }, 5000)
      
    }

    return (
        <div>
        {anecdotesSorted.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteId(anecdote.content, anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList

