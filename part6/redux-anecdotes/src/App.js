import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const anecdotes = useSelector(state => state)
  const anecdotesSorted = [...anecdotes].sort((a, b) => {
      return b.votes - a.votes
    })


  const dispatch = useDispatch()

  const voteId = (id) => {
    return {
      type: 'VOTE',
      data: {id}
    }
  }

  const vote = (id) => {
    console.log('vote', id)
    console.log('anecdotes', anecdotes)
    dispatch(voteId(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch({
      type: 'NEW_ANECDOTE',
      data: event.target.anecdote.value
    })
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
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