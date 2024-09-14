import Login from '../pages/Login/Login.jsx';
import Home from '../pages/Home/Home.jsx';
import AuthenticatedRedirect from '../components/AuthenticatedRedirect/AuthenticatedRedirect.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';

const routes = [
  //user
  { path: "/login", element: <AuthenticatedRedirect><Login /></AuthenticatedRedirect>, protected: false },
  { path: "/", element: <Home />, protected: true },

  //other
  { path: "*", element: <NotFound />, protected: false },
];

export default routes;
