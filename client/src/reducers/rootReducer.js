const initState = {
    userLoggedIn: false,
    user: null
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'LOGIN_USER') {
        return {
            ...state,
            userLoggedIn: true,
            user: action.user
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

export default rootReducer;
