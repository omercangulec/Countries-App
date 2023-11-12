import { createContext, useContext, useEffect, useReducer } from "react";

const CountryContext = createContext();

const initialState = {
  countries: [],
  searchKey: "",
  sortBy: "default",
  currentPage: 1,
  recordsPerPage: 12,
};

function reducer(state, action) {
  switch (action.type) {
    case "countries/loaded":
      return { ...state, countries: action.payload };
    case "searchKey/set":
      return { ...state, searchKey: action.payload };
    case "sortBy/set":
      return { ...state, sortBy: action.payload };
    case "currentPage/next":
      return { ...state, currentPage: state.currentPage + 1 };
    case "currentPage/prev":
      return { ...state, currentPage: state.currentPage - 1 };

    default:
      throw new Error("Unkown action");
  }
}

function CountryProvider({ children }) {
  const [
    { countries, searchKey, sortBy, currentPage, recordsPerPage },
    dispatch,
  ] = useReducer(reducer, initialState);

  const isSearching = searchKey.length > 0 ? true : false;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(countries.length / recordsPerPage);

  let sortedItems;
  if (sortBy === "default") sortedItems = countries;
  if (sortBy === "aToZ") {
    sortedItems = countries
      .slice()
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }
  if (sortBy === "zToA") {
    sortedItems = countries
      .slice()
      .sort((a, b) => b.name.common.localeCompare(a.name.common));
  }
  if (sortBy === "population") {
    sortedItems = countries.slice().sort((a, b) => b.population - a.population);
  }

  function handleSetSearchKey(e) {
    dispatch({ type: "searchKey/set", payload: e.target.value.toLowerCase() });
  }

  useEffect(function () {
    async function getCountry() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok)
          throw new Error("Something went wrong with fetching countries");
        const data = await res.json();
        dispatch({ type: "countries/loaded", payload: data });
      } catch (err) {
        console.log(err);
      }
    }
    getCountry();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countries,
        searchKey,
        sortBy,
        currentPage,
        recordsPerPage,
        isSearching,
        indexOfFirstRecord,
        indexOfLastRecord,
        nPages,
        sortedItems,
        handleSetSearchKey,
        dispatch,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) throw new Error("Error");
  return context;
}

export { CountryProvider, useCountry };
