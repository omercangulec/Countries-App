import { useCountry } from "../contexts/CountryContext";

export function Search() {
  const { searchKey, handleSetSearchKey } = useCountry();
  return (
    <input
      className="search"
      type="text"
      placeholder="Search Country..."
      value={searchKey.toLowerCase()}
      onChange={handleSetSearchKey}
    />
  );
}
