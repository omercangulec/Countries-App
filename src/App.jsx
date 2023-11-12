import { CountryProvider } from "./contexts/CountryContext";
import Main from "./components/Main";
import NavBar from "./components/NavBar";

function App() {
  return (
    <CountryProvider>
      <NavBar />
      <Main />
    </CountryProvider>
  );
}

export default App;
