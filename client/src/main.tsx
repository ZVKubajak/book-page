import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import auth from './utils/auth.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Use Layout as the parent route
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Navigate to="/login" replace /> // Redirect root to login
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'home',
        element: auth.loggedIn() ? <Home /> : <Navigate to="/login" replace /> // Protect the /home route
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
