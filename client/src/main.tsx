import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorPage from './pages/Library.tsx';
import Login from './pages/Login.tsx';
import auth from './utils/auth.ts';
import Signup from './pages/Signup.tsx';
import Search from './pages/Search.tsx';
import BestSeller from './pages/Bestseller.tsx';
import Library from './pages/Library.tsx';
import Favorites from './pages/Favorites.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use Layout as the parent route
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="/login" replace />, // Redirect root to login
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: 'bestsellers',
        element: auth.loggedIn() ? <BestSeller /> : <Navigate to="/login" replace />
      },
      {
        path: 'favorites',
        element: auth.loggedIn() ? <Favorites /> : <Navigate to="/login" replace />
      },
      {
        path: 'library',
        element: auth.loggedIn() ? <Library /> : <Navigate to="/login" replace />
      }
    ]
  }
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
