import './App.css';
import Loader from "./components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import Router from './router/Router.jsx';

function App() {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;

  return (
    <div className="App">
      {loading && <Loader />}
      <Router />
    </div>
  )
};

export default App;

