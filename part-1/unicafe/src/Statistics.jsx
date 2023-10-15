import { StatisticLine } from "./StatisticLine";

export const Statistics = ({ data, feedbackGiven }) => {
  if (feedbackGiven) {
    return (
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Statistics</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <StatisticLine text={item.text} value={item.value} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};
