function Country({ country }) {
  let cur;
  if (country.currencies) {
    cur = Object.values(country.currencies);
  } else {
    return cur;
  }

  const countryName = country.name.common;
  return (
    <div className="box">
      <img className="img-flag" src={country.flags.png} alt="flag" />
      <div className="content">
        <div className="content-header">
          <h2>
            {
              /*countryName*/ countryName.includes(" ")
                ? countryName.split(" ")[0] +
                  " " +
                  countryName.split(" ")[1].slice(0, 3) +
                  "."
                : countryName
            }
          </h2>
          <h4>{country.region}</h4>
        </div>
        <div className="content-info">
          <p>
            <span>🏙️</span> {country.capital}
          </p>
          <p>
            <span>🗣️</span> {Object.values(country.languages)[0]}
          </p>
          <p>
            <span>👫</span>{" "}
            {new Intl.NumberFormat("en-EN", {
              maximumSignificantDigits: 3,
            }).format(country.population)}{" "}
          </p>
          <p>
            <span>💰</span> {cur[0].symbol}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Country;
