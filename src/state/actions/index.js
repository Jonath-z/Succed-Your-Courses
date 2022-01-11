import actionsType from "./action_types/actionType"

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