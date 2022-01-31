import actionsType from "./action_types/actionType";
import { fireStoreDB } from "../../components/services/firebase";

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

///////////////////// ALL COURSE ////////////////////////////////////////////
export const getAllCourse = (database) => {
    return (dispatch) => {
        database.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const courses = Object.values(snapshot.val());
                console.log(courses);
                dispatch({
                    type: actionsType.ALL_COURSE,
                    payload: courses
                });
            }
        });
    }
}

///////////////////////////// ENROLL TO THE COURSE //////////////////////////////
export const enroll = (enrolledCourses) => {
    console.log(enrolledCourses);
    return (dispatch) => {
        dispatch({
            type: actionsType.ENROLL,
            payload: enrolledCourses
        });
    }
}

//////////////////////// LEAVE THE COURSE ///////////////////////////////
export const leave = (courseID) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.LEAVE,
            payload: courseID
        });
    }
}
////////////////// MENU OPTIONS ////////////////////////////////////
export const myCourse = (menu) => {
    // console.log('menu action', menu);
    return (dispatch) => {
        dispatch({
            type: actionsType.MY_COUSES,
            payload: menu
        })
    }
}
export const exploreCourse = (menu) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.EXPLORE_COURSES,
            payload: menu
        })
    }
}
export const account = (menu) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.ACCOUNT,
            payload: menu
        })
    }
}

export const home = (menu) => {
    return (dispatch) => {
        dispatch({
            type: actionsType.HOME,
            payload: menu
        })
    }
}