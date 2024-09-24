import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import auth from "./utils/auth"; // Adjust the import path as necessary
import logo from './assets/logo.png';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    auth.logout();
  };

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center px-4 mb-5">
        <img className="logo" src={logo} alt="Bookpage logo" />
        {auth.loggedIn() && (
          <div className="nav d-flex align-items-center gap-4">
            <ul className="d-flex gap-4"> 
              <li>
                <NavLink to="/search">Search</NavLink>
              </li>
              <li>
                <NavLink to="/library">Library</NavLink>
              </li>
              <li>
                <NavLink to="/favorites">Favorites</NavLink>
              </li>
              <li>
                <NavLink to="/bestsellers">Best Sellers</NavLink>
              </li>
            </ul>
            <button className="btn btn-outline-dark" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
