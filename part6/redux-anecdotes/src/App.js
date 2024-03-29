import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App