const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Parts = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};
const Content = ({ parts, exercises }) => {
  return (
    <>
      <Parts part={parts[0]} exercises={exercises[0]} />
      <Parts part={parts[1]} exercises={exercises[1]} />
      <Parts part={parts[2]} exercises={exercises[2]} />
    </>
  );
};
const Total = ({ total }) => {
  return (
    <>
      <p>Number of exercises: {total.reduce((a, b) => a + b)}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        parts={course.parts.map((item) => item.name)}
        exercises={course.parts.map((item) => item.exercises)}
      />
      <Total total={course.parts.map((item) => item.exercises)} />
    </div>
  );
};

export default App;
