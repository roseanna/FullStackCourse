import { useState } from 'react'

const Person = ({name, number}) => { return <div>{name} {number}</div> }

const Persons = ({filter, persons}) => {
  const filteredList = () => {
    // filter has no value, show all
    if (filter === '') {
      return persons.map((person) => <Person key={person.id} name={person.name} number={person.number}/>)
    }

    // filter has a value, show filtered
    const filtered = persons.filter((person) => {
      return person.name.includes(filter)
    })
    return filtered.map((person) => <Person key={person.id} name={person.name} number={person.number}/>)
  }
  return filteredList()
}

const Filter = ({handleChange}) => {
  return (
    <div>
      filter shown with <input onChange={handleChange}/>
    </div>
  )
}

const PersonForm = ({handleNameChange, handleNumberChange, handleSubmit, newName, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
      number: <input value={newNumber} onChange={handleNumberChange}/>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
      setPersons(persons.concat({
        name: newName, 
        number: newNumber
      }))
      // reset the newName to empty string
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(newName + ' is already added to the phonebook')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}

export default App;
