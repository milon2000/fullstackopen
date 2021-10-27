import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./components/List";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect");
    axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      find countries <input onChange={handleSearchChange} value={searchTerm} />
      <List countries = {countries} searchTerm = {searchTerm} />
    </div>
  );
};

export default App;
