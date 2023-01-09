import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/Filter'
import { Countries } from './components/Countries'

const App = () =>{
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleChange = (event) => {
    setCountryFilter(event.target.value);
    if (countryFilter.length > 0) {
      const filtered = countries.filter((country) => {
        return country.name.common.includes(countryFilter)
      })
      setFilteredCountries(filtered)
      console.log(filtered)
    }
  }

  useEffect(() => {
    const restEndpoint = "https://restcountries.com/v3.1/all" 
    axios
      .get(restEndpoint)
      .then((response) => {
        console.log('response', response.data)
        setCountries(response.data)
      })
      .catch(error => console.error(error))
    }, [])

  return (
    <div>
      <Filter handleChange={handleChange}/>
      <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries} countryFilter={countryFilter} />
    </div>
  )
}

export default App;
