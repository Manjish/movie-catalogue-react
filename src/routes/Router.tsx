import { useRoutes } from "react-router-dom";
import Index from "../pages/Index";
import MovieDetail from "../pages/MovieDetail";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Index />,
    },

    {
      path: "/view/:id",
      element: <MovieDetail />,
    },

    {
      path: "/add",
      element: <AddMovie />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
};
export default Router;
