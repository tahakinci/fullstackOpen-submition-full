import { useState } from "react";
import { Statistics } from "./Statistics";
import { Button } from "./Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);

  const handleGood = () => {
    setAll(all + 1);
    setGood(good + 1);
    setIsFeedbackGiven(true);
  };

  const handleNeutral = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
    setIsFeedbackGiven(true);
  };

  const handleBad = () => {
    setAll(all + 1);
    setBad(bad + 1);
    setIsFeedbackGiven(true);
  };

  const average = ((good - bad) / all).toFixed(2);
  const positive = ((good / all) * 100).toFixed(2);

  const data = [
    {
      id: 1,
      text: "Good",
      value: good,
    },
    {
      id: 2,
      text: "Netural",
      value: neutral,
    },
    {
      id: 3,
      text: "Bad",
      value: bad,
    },
    {
      id: 4,
      text: "All",
      value: all,
    },
    {
      id: 5,
      text: "Average",
      value: isNaN(average) ? 0 : average,
    },
    {
      id: 6,
      text: "Positive",
      value: `${positive} %`,
    },
  ];
  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button text={"good"} handler={handleGood} />
        <Button text={"neutral"} handler={handleNeutral} />
        <Button text={"bad"} handler={handleBad} />
      </div>
      <div>
        <Statistics data={data} feedbackGiven={isFeedbackGiven} />
      </div>
    </div>
  );
};

export default App;
