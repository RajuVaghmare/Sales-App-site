import { USER_LOGIN, USER_LOGOUT } from "./Action";

const initialState = {
    user: {}
}

// Reducer function for handling user-related actions
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            // Update state with user information on login
            return {
                ...state,
                user: action.payload
            };
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
