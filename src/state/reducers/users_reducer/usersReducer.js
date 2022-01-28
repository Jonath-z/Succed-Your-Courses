import actionsType from "../../actions/action_types/actionType";


const fetchUsersReducer = (state = [], action) => {
    // console.log(action.payload);
    switch (action.type) {
        case (actionsType.FETCH_USERS): {
            return action.payload
        }
        case (actionsType.NO_USER_FOUND): {
            return action.payload
        }
        default:
            return state
    }
}

export default fetchUsersReducer;