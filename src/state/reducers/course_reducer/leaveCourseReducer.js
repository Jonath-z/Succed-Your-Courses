import actionsType from "../../actions/action_types/actionType";

const leave = (state = [], action) => {
    switch (action.type) {
        case actionsType.LEAVE:
            return action.payload
        default:
            return state;
    }
}

export default leave