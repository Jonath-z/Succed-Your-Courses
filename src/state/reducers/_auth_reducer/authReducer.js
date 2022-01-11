import actionsType from "../../actions/action_types/actionType";

export const authReducer = (state = false, action)=>{
    switch (action.type) {
        case actionsType.LOGIN:
            return true
        case actionsType.SIGNUP:
            return false
        default :
            return state    
    }
}