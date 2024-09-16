import Login from '../pages/Login/Login.jsx';
import Home from '../pages/Home/Home.jsx';
import Tenants from '../pages/Tenants/Tenants.jsx';
import AuthenticatedRedirect from '../components/AuthenticatedRedirect/AuthenticatedRedirect.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';

const routes = [
  //user
  { path: "/login", element: <AuthenticatedRedirect><Login /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  { path: "/", element: <Home />, protected: false, showSidebar: false },
  { path: "/tenants", element: <Tenants />, protected: true, showSidebar: true },

  //other
  { path: "*", element: <NotFound />, protected: false, showSidebar: false },
];

export default routes;
