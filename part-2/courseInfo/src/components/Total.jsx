export const Total = ({ total }) => {
  return (
    <>
      <p>Number of exercises: {total.reduce((a, b) => a + b)}</p>
    </>
  );
};
