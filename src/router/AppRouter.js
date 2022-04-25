import { useRoutes, Navigate } from "react-router-dom";
import DataAll from "../components/DataAll";
import Home from "../components/Home";
import Login from "../components/Login";
import Context from "../components/Context";
import Publish from "../components/Published";
import Compile from "../components/Compile";
function AppRoute() {
  const element = useRoutes([
    {
      path: "/",
      element: <Navigate to={"/login"}></Navigate>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/home",
      element: <Home></Home>,
      children: [
        {
          path: "",
          element: <DataAll></DataAll>,
        },
        {
          path: "article",
          element: <Context></Context>,
        },
        {
          path: "publish",
          element: <Publish></Publish>,
        },
        {
          path: "edit/:id",
          element: <Compile></Compile>,
        },
      ],
    },
  ]);
  return element;
}
export default AppRoute;
