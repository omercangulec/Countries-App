import { createContext, useContext, useEffect, useReducer } from "react";

const CountryContext = createContext();

const initialState = {
  countries: [],
  searchKey: "",
  sortBy: "default",
  currentPage: 1,
  recordsPerPage: 12,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "countries/loading":
      return { ...state, isLoading: true };
    case "countries/loaded":
      return { ...state, isLoading: false, countries: action.payload };
    case "searchKey/set":
      return { ...state, isLoading: false, searchKey: action.payload };
    case "sortBy/set":
      return { ...state, isLoading: false, sortBy: action.payload };
    case "currentPage/next":
      return { ...state, isLoading: false, currentPage: state.currentPage + 1 };
    case "currentPage/prev":
      return { ...state, isLoading: false, currentPage: state.currentPage - 1 };

    default:
      throw new Error("Unkown action");
  }
}

function CountryProvider({ children }) {
  const [
    { countries, searchKey, sortBy, currentPage, recordsPerPage, isLoading },
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
      dispatch({ type: "countries/loading" });
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
        isLoading,
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
