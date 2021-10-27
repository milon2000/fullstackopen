import ReactDOM from 'react-dom';
import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);
  let index = points.indexOf(Math.max(...points));
  let number = Math.max(...points);

  const handleClick = () => {
    let randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
    console.log('klikanie', selected);
  }

  const handleVote = () => {
    const point = [...points];
    point[selected] +=1;
    setPoints(point);
    console.log('punkt', point);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} has {points[selected]} votes</p>
      <p></p>
      <button onClick = {handleVote}>vote</button>
      <button onClick= {handleClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
      <p> has {number} votes </p>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))




