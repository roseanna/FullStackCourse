import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(true)

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
          setIsSuccess(true)
          setMessage(`Person ${newPerson.name} was added successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)    
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
            setIsSuccess(true)
            setMessage(`Person ${newPerson.name} was updated successfully`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)    
            const updatedList = persons.map((p) => p.id === duplicates[0].id ? updatedPerson : p)
            setPersons(updatedList)
          })
          .catch(error => {
            setIsSuccess(false)
            setMessage(`Person ${newPerson.name} was not updated successfully`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)    

          })
      } 
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setIsSuccess(true)
        setMessage('Person data was retrieved successfully')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(response.data)
      })
  }, [])
  

  return (
    <div>
      <Notification isSuccess={isSuccess} message={message}/>
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
        setPersons={setPersons}
        setIsSuccess={setIsSuccess}
        setMessage={setMessage}/>
    </div>
  )
}

export default App;
