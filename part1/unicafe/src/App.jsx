import { useState } from 'react'

const Button = ({ label, action }) => <button onClick={action}>{label}</button>;

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}{label === "Positive" && "%"}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, score }) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine label={"Good"} value={good} />
          <StatisticLine label={"Neutral"} value={neutral} />
          <StatisticLine label={"Bad"} value={bad} />
          <StatisticLine label={"All"} value={total} />
          <StatisticLine label={"Average"} value={total > 0 ? score / total : 0} />
          <StatisticLine label={"Positive"} value={total > 0 ? (good / total) * 100 : 0} />
        </tbody>
      </table>
    </>)
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label={"Good"} action={() => setGood(good + 1)} />
      <Button label={"Neutral"} action={() => setNeutral(neutral + 1)} />
      <Button label={"Bad"} action={() => setBad(bad + 1)} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={good + neutral + bad}
        score={good - bad} />
    </div>
  )
}

export default App