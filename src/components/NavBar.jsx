import { Logo } from "./Logo";
import { NumCountry } from "./NumCountry";
import { Search } from "./Search";

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumCountry />
    </nav>
  );
}

export default NavBar;
