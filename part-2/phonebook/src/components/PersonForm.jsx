export const PersonForm = ({ addPerson, setNewName, setNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={(e) => setNewName(e.target.value)} />
      </div>

      <div>
        number: <input onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
