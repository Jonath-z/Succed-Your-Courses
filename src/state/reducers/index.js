import { combineReducers } from "redux";
import { authReducer } from "./_auth_reducer/authReducer";
import formReducer from "./form_Reducer/formReducer";
import fetchUsersReducer from "./users_reducer/usersReducer";

const reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    fetchUsers: fetchUsersReducer
});

export default reducers;