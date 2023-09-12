import { useRoutes, BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.scss';
import Themeroutes from "./routes/Router";

const App = () => {
  const routing = useRoutes(Themeroutes);
  return( 
    <div className="dark">{routing}</div>
  );
};

export default App;
