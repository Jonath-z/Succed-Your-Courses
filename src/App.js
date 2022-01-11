import './App.css';
// import Login from './components/login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home/Home';
import Dashbord from './components/dashbord/Dashbord';
import ModuleContent from './components/coursesModules/ModuleContent'
import SplashScreen from './components/_splash-screen/screens/SplashScreen';
import AuthIndex from './components/Auth-user/AuthIndex';

function App() {
  return (
    <Router>
      
      <Route path='/' exact>
        <div className="App">
          {/* <Login /> */}
          <SplashScreen/>
        </div>
      </Route>
      <Route path='/user-authentication' component={AuthIndex}/>
      <Route path='/welcome' component={Home} />
      <Route path='/dashbord' component={Dashbord} />
      <Route path='/module' component={ModuleContent} />
      
    </Router>
  );
}

export default App;
