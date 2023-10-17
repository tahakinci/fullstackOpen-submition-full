import { useEffect, useState } from "react";
import axios from "axios";
import { Persons } from "./components/Persons";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    const URL = "http://localhost:3001/persons";
    axios.get(URL).then((res) => {
      const data = res.data;
      setPersons(data);
    });
  }, []);

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
