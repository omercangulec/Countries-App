import { useCountry } from "../contexts/CountryContext";
import Countries from "./Countries";
import Pagination from "./Pagination";
import { Sort } from "./Sort";

function Main() {
  const { isLoading } = useCountry();

  return (
    <div className="main">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <Sort />
          <Countries />
          <Pagination />
        </>
      )}
    </div>
  );
}

export default Main;
