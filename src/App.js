import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home/Home';
import Dashbord from './components/dashbord/Dashbord';
import ModuleContent from './components/coursesModules/ModuleContent'
import SplashScreen from './components/_splash-screen/screens/SplashScreen';
import AuthIndex from './components/Auth-user/AuthIndex';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators } from "./state";
import { realTimeDB } from "./components/modules/firebase";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { getAllCourse } = bindActionCreators(actionsCreators, dispatch);
  
  useEffect(() => {
    getAllCourse(realTimeDB);
  }, [getAllCourse]);

  return (
    <Router>
      <Route path='/' exact>
        <div className="App">
          <SplashScreen />
        </div>
      </Route>
      <Route path='/user-authentication' component={AuthIndex} />
      <Route path='/home' component={Home} />
      <Route path='/dashbord' component={Dashbord} />
      <Route path='/module' component={ModuleContent} />
    </Router>
  );
}

export default App;
