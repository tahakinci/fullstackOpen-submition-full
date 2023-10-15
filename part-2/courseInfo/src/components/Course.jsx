import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = ({ course }) => {
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
