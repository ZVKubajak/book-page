import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, useNavigate } from "react-router-dom";
import auth from "./utils/auth"; // Adjust the import path as necessary

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    auth.logout();
  };

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center p-4 mb-5">
        <h3>Bookpage</h3>
        {auth.loggedIn() && (
          <div>
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
