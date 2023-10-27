import { useEffect, useState } from "react";
import { CountryInfo } from "./components/CountryInfo";
function App() {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [detail, setDetail] = useState(true);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  useEffect(() => {
    filter();
  }, [search]);

  const fetchAllCountries = async () => {
    const response = await fetch(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );
    const json = await response.json();
    setAllCountries(json);
  };

  const filter = () => {
    const filteredCountries = allCountries.filter((country) => {
      const name = country.name.common;
      return name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
    setFilteredCountries(filteredCountries);
  };
  return (
    <div>
      <form>
        find countries{" "}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
      </form>
      <div>
        {filteredCountries.length <= 10 ? (
          !filteredCountries.length ? (
            <p>No matches</p>
          ) : (
            filteredCountries.map((country) => (
              <CountryInfo
                key={country.fifa}
                country={country}
                detail={detail}
              />
            ))
          )
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </div>
  );
}

export default App;
