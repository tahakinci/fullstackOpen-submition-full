import { Detail } from "./Detail";

export const CountryInfo = ({ country, detail }) => {
  return (
    <div>
      <h2>
        {country.name.common} <button>show</button>
      </h2>
      {detail && <Detail data={country} />}
    </div>
  );
};
