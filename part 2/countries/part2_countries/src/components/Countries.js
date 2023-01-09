const CountryDetails = ({country}) => {
  return (
    <div>
        <h1>{country.name.common}</h1>
        <div>
          <p>capital: {country.capital} </p>
          <p>area: {country.area} </p>
        </div>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} />
      </div>
  )
}

export const Countries = ({ countries, setFilteredCountries }) => {
  console.log("Countries", countries)
  if (countries.length == 1) {
    const country = countries[0];
    return <CountryDetails country={country} />;
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <div>
    {countries.map((country) => 
      <div key={country.name.common}>
        {country.name.common} <button onClick={()=>{
          console.log('clicked', country.name.common)
          setFilteredCountries([country])
          }}>show</button>
      </div>
    )}
    </div>
  );
};
