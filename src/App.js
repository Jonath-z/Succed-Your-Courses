import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/modules/home";
import Dashbord from "./components/modules/dashbord/index";
import ModuleContent from './components/modules/coursesModules'
import SplashScreen from './components/modules/_splash-screen/screens/SplashScreen';
import AuthIndex from './components/modules/Auth-user/AuthIndex';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators } from "./state";
import { realTimeDB } from "./components/services/firebase";
import { useEffect } from "react";
import { syncHistoryWithStore} from 'react-router-redux';
import { Provider } from "react-redux";
import store from "./state/store/store";

const App = () => {
  const history = syncHistoryWithStore(Router, store);
  const dispatch = useDispatch();
  const { getAllCourse } = bindActionCreators(actionsCreators, dispatch);
  
  useEffect(() => {
    getAllCourse(realTimeDB);
  }, [getAllCourse]);


  return (
    <Provider store={store}>
      <Router history={history}>
          <Route path='/' exact>
            <div className="App">
              <SplashScreen />
            </div>
          </Route>
          <Route path='/user-authentication' component={AuthIndex} />
          <Route path='/home' component={Home} />
          <Route path='/dashbord' component={Dashbord} />
          <Route path='/module' component={ModuleContent} />
          <Route path='/module-content/:id' component={ModuleContent} />
      </Router>
    </Provider>
  );
}

export default App;
