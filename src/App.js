// import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/modules/home";
import Dashbord from "./components/modules/dashbord/index";
import ModuleContent from './components/modules/coursesModules'
import SplashScreen from './components/modules/_splash-screen/screens/SplashScreen';
import AuthIndex from './components/modules/Auth-user/AuthIndex';
import { createBrowserHistory } from "history";
import { Router,Route } from "react-router";
import store from "./state/store/store";
import { DispatchAllcourses } from "./hooks";
import UserProvider from "./components/context";

const App = () => {
  DispatchAllcourses();

  const history = createBrowserHistory(store);

  return (
    <UserProvider>
      <Router history={history}>
        <Route path='/' exact>
          <div className="App">
            <SplashScreen />
          </div>
        </Route>
        <Route path='/user-authentication' component={AuthIndex} />
        <Route path='/home' component={Home} />
        <Route path='/dashbord' component={Dashbord} />
        <Route path='/module-content/:id' component={ModuleContent} />
      </Router>
    </UserProvider>
  );
}

export default App;
