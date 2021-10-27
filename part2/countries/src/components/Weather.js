import React, {useState, useEffect} from "react"
import axios from "axios"

const Weather = ({capital}) => {
    const [weather, setWeather] = useState('')
    
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const params = {
            access_key: api_key,
            query: {capital},
        }
        axios
            .get('http://api.weatherstack.com/current', {
                params
            })
            .then((response) => {
                const apiResponse = response.data;
                setWeather(apiResponse)
            }).catch(error => {
                console.log(error);
            })

    }, [])

   return (
       <div>
          <h2>Weather in {capital}</h2> 
          <p><strong>temperature: </strong>{weather.current && weather.current.temperature} Celcius</p>
          <img src={weather.current && weather.current.weather_icons} alt="icon"></img>
          <p><strong>wind:</strong> {weather.current && weather.current.wind_speed} mph direction {weather.current && weather.current.wind_dir}  </p>
       </div>
       
   )
}

export default Weather