import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ALlFlowers from "../pages/ALlFlowers";
import CreateFlower from "../pages/CreateFlower";
import SellsHistory from "../pages/SellsHistory";
import AddSell from "../pages/AddSell";
import Dashboard from "../pages/Dashboard";
import UpdateFlower from "../components/UpdateFlower";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/all-flowers",
        element: <ALlFlowers />,
      },
      {
        path: "/add-flower",
        element: <CreateFlower />,
      },
      {
        path: "/add-sells",
        element: <AddSell />,
      },
      {
        path: "/sells",
        element: <SellsHistory />,
      },
      {
        path: '/update-flower',
        element: <UpdateFlower />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
