import "./App.css";
import {BrowserRouter as Router} from 'react-router-dom';
import UserProvider from './context/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/pages/shared/Navbar";
import Routes from "./components/routes/Routes";



function App() {

  return (
    <div className='App'>
      <Router>
        <UserProvider>
          <Navbar />
          <Routes />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
