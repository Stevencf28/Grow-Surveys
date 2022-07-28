import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Surveys } from "./components/survey-components/Surveys";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/surveys',
    element: <Surveys />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
      path: '/register',
      element: <Register />
  }
];

export default AppRoutes;
