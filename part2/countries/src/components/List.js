import React from "react"
import CountryData from "./CountryData"
import CountryDetails from './CountryDetails'


const List = ({countries, searchTerm}) => {

    console.log('hej', countries)
    let countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if(countriesToShow.length === 1) {
    return (
     <CountryData country = {countriesToShow[0]} />
    ) }
  
    else if(countriesToShow.length < 10) {

    return (
      <div>
      {countriesToShow.map(country => 
        <CountryDetails key = {country.name.common} country = {country} />
        )}
      </div>
    ) } else {
        return (
      <p>Too many matches, specify another filter</p>
    )}
  }
  
export default List