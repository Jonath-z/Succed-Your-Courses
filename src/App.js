import './App.css';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home/Home';


function App() {
  return (
    <Router>
      <>
        <Route path='/' exact>
          <div className="App">
            <Login />
          </div>
        </Route>
        <Route path='/welcome' component={Home}/>
      </>
    </Router>
  );
}

export default App;
