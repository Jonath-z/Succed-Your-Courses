import actionsType from "../../actions/action_types/actionType";

const enroll = (state=[],action) => {
    switch (action.type) {
        case actionsType.ENROLL:
            return action.payload
        default:
            return state;
    }
}

export default enroll