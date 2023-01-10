import personService from '../services/person'

const Person = ({ name, number, deletePerson, id }) => { 

  return (
  <div>
    {name} {number}
    <button onClick={()=>deletePerson(id)}>delete</button>
  </div>); 
};

const Persons = ({ filter, persons, setPersons, id }) => {

  const deletePerson = (id) => {
    if (window.confirm("Are you sure?")) {
      const request = personService.deletePhone(id)
      request.then(
        (response) => {
          const updatedPersons = persons.filter((p) => { return p.id !== id })
          setPersons(updatedPersons)  
        }
      )
      .catch((error) => console.log(error))
    }
  }

  const filteredList = () => {
    // filter has no value, show all
    if (filter === '') {
      return persons.map((person) => {
        return <Person 
          key={person.id} 
          id={person.id} 
          deletePerson={deletePerson} 
          name={person.name} 
          number={person.number} />
      });
    }

    // filter has a value, show filtered
    const filtered = persons.filter((person) => {
      return person.name.includes(filter);
    });
    return filtered.map((person) => {
      return <Person 
        key={person.id} 
        id={person.id} 
        deletePerson={deletePerson}  
        name={person.name} 
        number={person.number} />
      });
  };
  return filteredList();
};

export default Persons;