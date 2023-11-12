import { useCountry } from "../contexts/CountryContext";

export function NumCountry() {
  const { countries } = useCountry();
  return (
    <p className="num-country">
      There are <strong>{countries.length}</strong> countries in the world.
    </p>
  );
}
