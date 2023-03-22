import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Homepage from "./components/homepage";
import Search from "./components/search";
import Library from "./components/library";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/:userId/playlists/:playlistId",
    element: <h1>This is the default for now</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
