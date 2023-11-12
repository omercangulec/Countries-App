import { useCountry } from "../contexts/CountryContext";

function Pagination() {
  const { currentPage, dispatch, nPages } = useCountry();
  function nextPage() {
    if (currentPage !== nPages) dispatch({ type: "currentPage/next" });
    window.scrollTo(0, 0);
  }

  function prevPage() {
    if (currentPage !== 1) dispatch({ type: "currentPage/prev" });
    window.scrollTo(0, 0);
  }

  const prevBtnDisabled = currentPage === 1 ? true : false;
  const nextBtnDisabled = currentPage === nPages ? true : false;
  const btnDisabledStyle = {
    backgroundColor: "#ccc",
    color: "#666",
    pointerEvents: "none",
  };
  const btnEnabledStyle = {
    backgroundColor: "#2f9e44",
    color: "#fff",
  };

  return (
    <div className="pagi">
      <span>
        Page {currentPage} of {nPages}
      </span>
      <div className="btns">
        <button
          style={prevBtnDisabled ? btnDisabledStyle : btnEnabledStyle}
          className="btn"
          onClick={prevPage}
        >
          Prev
        </button>
        <button
          style={nextBtnDisabled ? btnDisabledStyle : btnEnabledStyle}
          className="btn"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
