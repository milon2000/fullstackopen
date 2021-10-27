import Weather from "./Weather"

const CountryData = ({country}) => {
    return (
        <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages &&
              Object.entries(country.languages).map(([key, value]) => (
                <li key = {key}>{value}</li>
              ))}
          </ul>
          <img src={country.flags.png} alt="flag"></img>
          <Weather capital = {country.capital} />
        </div>
    )
}

export default CountryData