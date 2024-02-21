import { useRoutes } from "react-router-dom";
import Index from "../pages/Index";
import MovieDetail from "../pages/MovieDetail";
import AddMovie from "../pages/AddMovie";

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
        path:"/add",
        element:<AddMovie/>
    }
  ]);
};
export default Router;
