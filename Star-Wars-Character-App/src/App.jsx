// import Login from "./components/login";
// import Listings from "./Listings";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import Login from "./components/login/loginwithemail";
// const router = createBrowserRouter([
//   { path: '/', element: <Login /> },
//   { path: '/listings/:id', element: <Listings /> }
// ])
// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   )
// }
// export default App;
import Login from "./components/login";
import Listings from "./Listings";
import Logout from "./components/logout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/listings', element: <Listings /> }, // Updated to match the Login redirect
  { path: '/logout', element: <Logout /> } // Add this route
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App;

