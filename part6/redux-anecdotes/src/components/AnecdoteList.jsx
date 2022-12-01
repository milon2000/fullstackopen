import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const anecdotesSorted = [...anecdotes].sort((a, b) => {
        return b.votes - a.votes
      })
  
    const dispatch = useDispatch()
    const voteId = (id) => {
      dispatch(vote(id))
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
            <button onClick={() => voteId(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList

