import { useState } from "react/cjs/react.development";
import CountryData from "./CountryData";

const CountryDetails = (props) => {
  const country = props.country;
  const [showDetails, setShowDetails] = useState(false);
  return showDetails   
        ? <CountryData country = {country} /> 
        : <div>{country.name.common}
          <button onClick={() => setShowDetails(!showDetails)}>show</button></div>
}

export default CountryDetails;

/*The 'country.language' is undefined in the beginning as it takes some time to fetch the data from your API. So your code ends up being Object.entries(null) and hence the error. Place a check if country.language is not null before you use Object.entires() as shown below.*/
