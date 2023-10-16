import { useState } from "react";
import { Persons } from "./components/Persons";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const nameArr = persons.map((item) => item.name);
    if (nameArr.includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons([
      ...persons,
      { id: persons.length + 1, name: newName, number: newNumber },
    ]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />

      <h3>Add New Number</h3>
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} />
    </div>
  );
};

export default App;
