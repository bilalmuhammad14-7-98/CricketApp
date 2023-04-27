function authReducer(state = { user: { token: null } }, action) {
    switch (action.type) {
        case 'SET_USER': {
            console.log("data: ", action.data)
            return { ...state, user: action.data }
        }
        case 'UNSET_USER': {
            return { ...state, user: { token: null } }
        }
        default: {
            return state
        }
    }
}

export default authReducer