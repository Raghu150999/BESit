const initState = {
    userLoggedIn: false,
    user: null
}

const userReducer = (state = initState, action) => {
    if (action.type === 'LOGIN_USER') {
        return {
            ...state,
            userLoggedIn: true,
            user: action.payload
        }
    }

    if (action.type === 'LOGOUT_USER') {
        return {
            userLoggedIn: false,
            user: null
        }
    }
    return state; // returning same state for unspecified action
}

export default userReducer;
