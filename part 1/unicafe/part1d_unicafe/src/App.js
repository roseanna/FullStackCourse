import { useState } from 'react'

const Header = ({headerText}) => <h2>{headerText}</h2>
const StatisticLine = ({label, value}) => (
  <tr>
    <td>{label}</td> 
    <td>{value}</td> 

  </tr>
)
const Button = ({handleClick, label}) => (
  <button onClick={handleClick}>{label}</button>
)

const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  const average = (good * 1 + bad * -1)/all
  const positive = good/all * 100 + '%'

  if (all == 0) { 
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <StatisticLine label='good' value={good}></StatisticLine>
        <StatisticLine label='neutral' value={neutral}></StatisticLine>
        <StatisticLine label='bad' value={bad}></StatisticLine>
        <StatisticLine label='all' value={all}></StatisticLine>
        <StatisticLine label='average' value={average}></StatisticLine>
        <StatisticLine label='positive' value={positive}></StatisticLine>
      </table>
    </div>
  )
}

const MostVotes = ({points, anecdotes}) => {
  console.log(...points)
  let maxValue = Math.max(...points)
  console.log(maxValue )
  let maxPointsIndex = points.indexOf(maxValue)
  console.log(maxPointsIndex) 
  return (
    <div>{anecdotes[maxPointsIndex]} 
      <p>has {points[maxPointsIndex]} votes </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const clickBad = () => setBad(bad + 1)
  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  console.log('points', points)
  
  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const nextAnecdote = () => {
    if (selected >= anecdotes.length - 1) setSelected(0) 
    else setSelected(selected + 1)
  }

  return (
    <>
      <Header headerText='give feedback' />
      <Button handleClick={clickGood} label='good' />
      <Button handleClick={clickNeutral} label='neutral' />
      <Button handleClick={clickBad} label='bad' />

      <Header headerText='statistics'/>
      <Statistics good={good} bad={bad} neutral={neutral} />

      <Header headerText='anecdotes' />
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleClick={vote} label='vote'></Button>
      <Button handleClick={nextAnecdote} label='next anecdote'></Button>

      <Header headerText='anecdote with most votes' />
      <MostVotes points={points} anecdotes={anecdotes}/>
    </>
  )
}

export default App;
