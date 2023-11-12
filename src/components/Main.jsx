import Countries from "./Countries";
import Pagination from "./Pagination";
import { Sort } from "./Sort";

function Main() {
  return (
    <div className="main">
      <Sort />
      <Countries />
      <Pagination />
    </div>
  );
}

export default Main;
