import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./pages/Library.tsx";
import Reviews from "./pages/Reviews.tsx";
import Login from "./pages/Login.tsx";
import auth from "./utils/auth.ts";
import Signup from "./pages/Signup.tsx";
import Search from "./pages/Search.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use Layout as the parent route
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/library" replace />, // Redirect root to login
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/reviews",
        element: auth.loggedIn() ? (
          <Reviews />
        ) : (
          <Navigate to="/login" replace />
        ), // Protect the /home route
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
