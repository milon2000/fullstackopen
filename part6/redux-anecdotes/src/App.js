import { useSelector, useDispatch } from 'react-redux';
import { vote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';


const App = (props) => {
  const anecdotes = useSelector(state => state)
  const anecdotesSorted = [...anecdotes].sort((a, b) => {
      return b.votes - a.votes
    })


  const dispatch = useDispatch()
  

  const voteId = (id) => {
    dispatch(vote(id))
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
    <AnecdoteForm store = {props.store}/>
    </div>
  )
}

export default App