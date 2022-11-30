import { useSelector, useDispatch } from 'react-redux';
import { vote, createAnecdote} from './reducers/anecdoteReducer';


const App = () => {
  const anecdotes = useSelector(state => state)
  const anecdotesSorted = [...anecdotes].sort((a, b) => {
      return b.votes - a.votes
    })


  const dispatch = useDispatch()
  

  const voteId = (id) => {
    dispatch(vote(id))
  }



  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    // dispatch({
    //   type: 'NEW_ANECDOTE',
    //   data: event.target.anecdote.value
    // })
    event.target.anecdote.value = ''
  }


  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit = {addAnecdote}>
        <div><input name = "anecdote"/></div>
        <button type = "submit">create</button>
      </form>
    </div>
  )
}

export default App