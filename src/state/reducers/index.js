import { combineReducers } from "redux";
import { authReducer } from "./_auth_reducer/authReducer";
import formReducer from "./form_Reducer/formReducer";
import fetchUsersReducer from "./users_reducer/usersReducer";
import { allCourseReducer } from "./course_reducer/allCourseReducer";
import enroll from "./course_reducer/enrollReducer";
import leave from "./course_reducer/leaveCourseReducer";
import menuReducer from "./menuReducers/menuReducer";
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    fetchUsers: fetchUsersReducer,
    coursesReducer: allCourseReducer,
    enroll: enroll,
    leave: leave,
    menuReducer: menuReducer,
    routing: routerReducer
});

export default reducers;