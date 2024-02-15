import { useRoutes } from "react-router-dom";
import Index from "../pages/Index";
import MovieDetail from "../pages/MovieDetail";

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
  ]);
};
export default Router;
