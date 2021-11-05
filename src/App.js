import './App.css';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home/Home';
import Dashbord from './components/dashbord/Dashbord';
import ModuleContent from './components/courses/coursesModules/ModuleContent'

function App() {
  return (
    <Router>
      
      <Route path='/' exact>
        <div className="App">
          <Login />
        </div>
      </Route>
      <Route path='/welcome' component={Home} />
      <Route path='/dashbord' component={Dashbord} />
      <Route path='/module' component={ModuleContent} />
      
    </Router>
  );
}

export default App;
