import { useState } from "react";

export const Filter = ({ persons }) => {
  const [filter, setFilter] = useState([]);

  const handleFilter = (e) => {
    if (!e.target.value) return setFilter([{ name: "", number: "", id: 0 }]);
    setFilter(
      persons.filter((item) =>
        item.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      )
    );
  };
  return (
    <div>
      <form>
        filter: <input type="text" onChange={(e) => handleFilter(e)} />
      </form>
      <ul>
        {filter.map(
          (item) =>
            filter.length && (
              <li key={item.id}>
                {item.name} - {item.number}
              </li>
            )
        )}
      </ul>
    </div>
  );
};
