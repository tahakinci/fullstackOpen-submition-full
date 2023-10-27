export const Notification = ({ message }) => {
  if (!message) return;
  return <div className={`${message[0]}`}>{message[1]}</div>;
};
