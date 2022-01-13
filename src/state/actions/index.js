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

export const fetchUsers = (email) => {
    return async(dispatch) => {
        fireStoreDB.collection('users').where("email", "==", email).get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        // if (doc.data().password === password) {
                            dispatch({
                                type: actionsType.FETCH_USERS,
                                payload: doc.data()
                            });
                        // }
                    })
                }
        }).catch(err => console.log(err));
    }
}

///////////////////// GET ALL COURSE ////////////////////////////////////////////
export const getAllCourse = (database) => {
    console.log(database);
    return (dispatch) => {
        database.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const courses = Object.values(snapshot.val());
                dispatch({
                    type: actionsType.ALL_COURSE,
                    payload: courses
                });
            }
        });
    }
}