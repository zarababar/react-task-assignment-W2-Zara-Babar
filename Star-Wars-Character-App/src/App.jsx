import Login from "./components/login";
import Listings from "./pages/Listings";
import Logout from "./components/logout";
import RouteGuard from "./components/routeguard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />, // Wrap routes with RouteGuard
    children: [
      { path: '', element: <Login /> }, // Public route (login)
      { path: '/listings', element: <Listings /> }, // Protected route
      { path: '/logout', element: <Logout /> } // Protected route
    ]
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
