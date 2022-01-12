import actionsType from "../../actions/action_types/actionType";

const formReducer = (state = {}, action) => {
    state.data = action.payload;
    
    switch (action.type) {
        case actionsType.LOGIN_SUBMIT: {
            const data = {
                email: state.data.email,
                password: state.data.password,
            }
            return data
        }
        case actionsType.SIGNUP_SUBMIT: {
            const data = {
                name: state.data.name,
                email: state.data.email,
                password: state.data.password,
            }
            return data
        }
        default:
            return state;
    }
}

export default formReducer;