import React, { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import ErrorMessage from "./components/ErrorMessage"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSearhChange = (event) => {
    setSearchTerm(event.target.value)
  };
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 1000),
    };

    const person = persons.find((person) => person.name === newName)
    const changedPerson = { ...person, number: newNumber }
    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.name === newName ? returnedPerson : p))
            );

            setMessage(`Updated ${person.name}`)
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              ` Information of '${person.name}' has already been removed from server`
            );
            setPersons(persons.filter((p) => p.name !== person.name))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            setNewName("");
            setNewNumber("")
          });
      }
    } else {
      personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        setErrorMessage(error.response.data)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName("")
        setNewNumber("")
      })
  
    }
  }

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <ErrorMessage errorMessage={errorMessage} />
      <Filter handleSearchChange={handleSearhChange} searchTerm={searchTerm} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
