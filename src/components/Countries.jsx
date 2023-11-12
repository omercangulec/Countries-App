import { useCountry } from "../contexts/CountryContext";
import Country from "./Country";

function Countries() {
  const {
    isSearching,
    sortedItems,
    searchKey,
    indexOfFirstRecord,
    indexOfLastRecord,
  } = useCountry();
  return (
    <div className="boxes">
      {isSearching
        ? sortedItems
            .filter((country) =>
              country.name.common.toLowerCase().includes(searchKey)
            )
            .map((country) => <Country country={country} key={country.cca2} />)
        : sortedItems
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map((country) => <Country country={country} key={country.cca2} />)}
    </div>
  );
}

export default Countries;
