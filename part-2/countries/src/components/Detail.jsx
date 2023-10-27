import { useEffect, useState } from "react";

export const Detail = ({ data }) => {
  const [weather, setWeather] = useState([]);

  const APIKey = "974af0e542606139c8f00e7079e5ceab";

  useEffect(() => {
    fetchWeather();
  }, []);
  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.capitalInfo.latlng[0]}&lon=${data.capitalInfo.latlng[1]}&appid=${APIKey}`
    );
    const json = await response.json();
    setWeather(json);
  };
  return (
    <div>
      <p>capital: {data.capital[0]}</p>
      <p>area: {data.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(data.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={data.flags.png || data.flags.svg} alt={data.flag.alt} />
      <h3>Weather in {data.name.common}</h3>
      <p>temperature {weather?.main?.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${
          weather.length ? weather.weather[0].icon : ""
        }@2x.png`}
        alt={weather.length ? weather.weather[0].description : ""}
      />
      <p>wind {weather?.wind?.speed}</p>
    </div>
  );
};
