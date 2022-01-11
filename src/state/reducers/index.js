import { combineReducers } from "redux";
import { authReducer } from "./_auth_reducer/authReducer";

const reducers = combineReducers({
    auth: authReducer
});

export default reducers;