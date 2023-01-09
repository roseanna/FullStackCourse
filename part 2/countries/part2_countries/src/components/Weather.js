import axios from 'axios'
import { useState } from 'react'

const Weather = ({country}) => {
    const [temperature, setTemperature] = useState(0)
    const [windSpeed, setWindSpeed] = useState(0)
    // const api_key = process.env.REACT_APP_API_KEY
    const restEndpoint = "https://api.open-meteo.com/v1/forecast?latitude="
    + country.latlng[0] 
    + "&longitude=" + country.latlng[1] 
    + "&current_weather=true"

    console.log(restEndpoint)
    axios.get(restEndpoint)
        .then((response) => {
            const currentWeather = response.data.current_weather
            setTemperature(currentWeather.temperature)
            setWindSpeed(currentWeather.windspeed)
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <div>
            <h2>Weather in {country.name.common}</h2>
            temperature: {temperature} Celcius <br />

            wind speed: {windSpeed} m/s
        </div>
    )
}

export default Weather;