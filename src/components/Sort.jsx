import { useCountry } from "../contexts/CountryContext";

export function Sort() {
  const { sortBy, dispatch } = useCountry();
  return (
    <div className="actions">
      <span> &uarr;&darr; Sort By</span>
      <select
        value={sortBy}
        onChange={(e) =>
          dispatch({ type: "sortBy/set", payload: e.target.value })
        }
      >
        <option value="default">Default</option>
        <option value="aToZ">A-Z</option>
        <option value="zToA">Z-A</option>
        <option value="population">Population</option>
      </select>
    </div>
  );
}
