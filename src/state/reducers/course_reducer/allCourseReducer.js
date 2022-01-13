import actionsType from "../../actions/action_types/actionType";

export const allCourseReducer = (state = [], action)=>{
    switch (action.type) {
        case actionsType.ALL_COURSE: {
            return action.payload
        }
        default:
            return state
    }
}

