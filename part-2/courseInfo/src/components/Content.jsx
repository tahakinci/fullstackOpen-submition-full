import { Parts } from "./Parts";

export const Content = ({ parts, exercises }) => {
  return (
    <>
      <Parts part={parts[0]} exercises={exercises[0]} />
      <Parts part={parts[1]} exercises={exercises[1]} />
      <Parts part={parts[2]} exercises={exercises[2]} />
    </>
  );
};
