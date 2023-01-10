import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const handleSubmit = (event) => {
    event.preventDefault()

    const duplicates = persons.filter((person) => {
      return person.name === newName 
    })
    // not a duplicate
    if (duplicates.length == 0) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(response => {      
          setPersons(persons.concat(response))
        })
        .catch((error) => console.log(error))

      // reset the newName to empty string
      setNewName('')
      setNewNumber('')
    }

    // duplicate is found
    else {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (confirm) {
        const newPerson = {...duplicates[0], number: newNumber}
        personService
          .update(duplicates[0].id, newPerson)
          .then((updatedPerson) => {
            const updatedList = persons.map((p) => p.id === duplicates[0].id ? updatedPerson : p)
            setPersons(updatedList)
          })
      } 
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit} 
        newName={newName} 
        newNumber={newNumber} />

      <h2>Numbers</h2>
      <Persons 
        filter={filter} 
        persons={persons} 
        setPersons={setPersons}/>
    </div>
  )
}

export default App;
