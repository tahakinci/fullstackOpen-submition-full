import { useEffect, useState } from "react";
import { Persons } from "./components/Persons";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";

import { getAll, create, erase, update } from "./services/persons";
import { Notification } from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getAll().then((initialValue) => {
      setPersons(initialValue);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const nameArr = persons.map((item) => item.name);
    if (nameArr.includes(newName)) {
      if (
        !confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      }
      return updateNumber();
    }
    const personObj = {
      name: newName,
      number: newNumber,
    };
    create(personObj).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewNumber("");
      setMessage(["success", `Added ${returnedPerson.name}`]);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const updateNumber = () => {
    const person = persons.find((person) => person.name === newName);
    const changedPerson = { ...person, number: newNumber };
    console.log(person.id);
    update(person.id, changedPerson).then((changedNumber) => {
      setPersons(persons.map((p) => (p.id !== person.id ? p : changedNumber)));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    if (!confirm("deneme")) {
      return;
    }
    erase(id)
      .then(() => {
        const newObj = persons.filter((person) => person.id !== id);
        setPersons(newObj);
      })
      .catch(() => {
        setMessage([
          "fail",
          `Information of ${
            persons.find((person) => person.id === id).name
          } has already been removed from server`,
        ]);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter persons={persons} />

      <h3>Add New Number</h3>
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
