import Home from "./components/modules/home";
import Dashbord from "./components/modules/dashbord/index";
import CourseContent from './components/modules/courseContent'
import SplashScreen from './components/modules/_splash-screen/screens/SplashScreen';
import AuthIndex from './components/modules/Auth-user/AuthIndex';
import { createBrowserHistory } from "history";
import { Router,Route } from "react-router";
import store from "./state/store/store";
import { DispatchAllcourses } from "./hooks";
import UserProvider from "./components/context";
import MediaQuery from "react-responsive";
import { useEffect } from "react";
import { realTimeDB } from "./components/services/firebase";
import { LocalStorage } from "./components/helper/localStorage";

const App = () => {
  DispatchAllcourses();

  useEffect(() => {
    realTimeDB.ref('/modules').on('value', (snapshot) => {
      if (snapshot.exists()) {
        const courses = Object.values(snapshot.val());
        // console.log(courses);
        LocalStorage.set('courses', JSON.stringify(courses));
      }
    });
  }, []);

  const history = createBrowserHistory(store);

  return (
    <UserProvider>
      <Router history={history}>
        <MediaQuery minWidth={300} maxWidth={767}>
          <Route path='/' exact>
            <div className="App">
              <SplashScreen />
            </div>
          </Route>
          <Route path='/user-authentication' component={AuthIndex} />
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <Route path='/' component={AuthIndex} exact />
        </MediaQuery>
        <Route path='/home' component={Home} />
        <Route path='/dashbord' component={Dashbord} />
        <Route path='/module-content/:id' component={CourseContent} />
      </Router>
    </UserProvider>
  );
}

export default App;
