import actionsType from "../../actions/action_types/actionType";

const menuReducer = (state = '', action) => {
    switch (action.type) {
        case actionsType.MY_COUSES:
            return actionsType.MY_COUSES
        case actionsType.EXPLORE_COURSES:
            return actionsType.EXPLORE_COURSES
        case actionsType.ACCOUNT:
            return actionsType.ACCOUNT
        case actionsType.REPORT_PROBLEM:
            return actionsType.REPORT_PROBLEM
        case actionsType.HOME:
            return actionsType.HOME
        default:
            return state
    }
}

export default menuReducer;