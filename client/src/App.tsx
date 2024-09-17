import { Outlet, useNavigate } from 'react-router-dom';
import auth from './utils/auth'; // Adjust the import path as necessary



function App() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    auth.logout();
  }

  return (
    <div className='container'>
      <header>
        <h1>Bookshelf Header - TODO show username on login</h1>
        {auth.loggedIn() && (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
