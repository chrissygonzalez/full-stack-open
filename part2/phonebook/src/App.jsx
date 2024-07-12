import { useState, useEffect } from 'react'
import personService from './services/persons';
import PhoneNumbers from './PhoneNumbers';
import PhoneForm from './PhoneForm';
import Filter from './Filter';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const peopleToShow = showAll ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filterText.toLowerCase()));

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons);
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (!existingPerson) {
      const nameObject = { name: newName, number: newNumber };
      personService.create(nameObject)
        .then(res => setPersons([...persons, res]));
      setNewName('');
      setNewNumber('');
      setMessage({ text: `Added ${newName}`, level: "info" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updated = { ...existingPerson, number: newNumber }
        personService.update(existingPerson.id, updated)
          .then(res => {
            const updated = persons.map(person => person.id === res.id ? res : person);
            setPersons(updated);
            setNewName('');
            setNewNumber('');
          }).catch(() => {
            setMessage({ text: `Information on ${existingPerson.name} has already been removed from the server`, level: "error" });
            setTimeout(() => setMessage(null), 3000);
          });
      }
    }
  }

  const handleFilter = (e) => {
    const text = e.target.value;
    setFilterText(text);
    if (text.length > 0) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then(deleted => {
          const updatedPersons = persons.filter(person => person.id !== deleted.id);
          setPersons(updatedPersons);
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterText={filterText} handleFilter={handleFilter} />
      <PhoneForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber} />
      <PhoneNumbers peopleToShow={peopleToShow} deletePerson={handleDelete} />
    </div>
  )
}

export default App