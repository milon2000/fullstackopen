import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => {
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  console.log(text, value);
  return (
    <table>
      <tr>
      <td>{text}</td>
      <td>{value}</td>
      </tr>
    </table>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if(all === 0) {
    return (<p>No feedback given</p>)
  } else
  return (
    <div>
      <Statistic text = "good" value = {good}/>
      <Statistic text = "neutral" value = {neutral}/>      
      <Statistic text = "bad" value = {bad}/>      
      <Statistic text = "all" value = {all}/>      
      <Statistic text = "average" value = {average}/>
      <Statistic text = "positive" value = {positive}/>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1 + neutral * 0) / (all);
  const positive = 100.0 * good / all + ' %';


  return (
    <div>
      <h2>give feedback</h2>
      <Button text={'good'} handleClick={() => setGood(good+1)} />
      <Button text={'neutral'} handleClick={() => setNeutral(neutral+1)} />
      <Button text={'bad'} handleClick={() => setBad(bad+1)} />
      <h2>statictics</h2>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive ={positive}/>
    </div> 
  )
}
ReactDOM.render(<App />, document.getElementById('root'))



