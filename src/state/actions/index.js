import actionsType from "./action_types/actionType";
import { fireStoreDB } from "../../components/modules/firebase";

// //////////////////////////// DISPLAY LOGIN & SIGNUP ACTION ////////////////////////////////////////
export const authLogin = (authState) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.LOGIN,
            payload: authState
            
        })
    }
}

export const authSignup = (authState) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.SIGNUP,
            payload: authState
        })
    }
}

////////////////////////////// GET FROMS DATA ACTIONS /////////////////////////////////////////////////
export const signupFormData = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.SIGNUP_SUBMIT,
            payload: data
        });
    }
}

export const loginFormData = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.LOGIN_SUBMIT,
            payload: data
        });
    }
}

export const fetchUsers = (database) => {
    return async(dispatch) => {
    database.collection('users').get()
            .then((snapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    dispatch({
                        type: actionsType.FETCH_USERS,
                        payload: doc.data()
                    });
                    // console.log(doc.data());
                });
            }
        }).catch(err => console.log(err));
    }
}