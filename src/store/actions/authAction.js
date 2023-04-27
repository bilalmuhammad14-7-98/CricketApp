function SetUser(val) {
    return {
        type: 'SET_USER',
        data: val
    }
}

function UnSetUser() {
    return {
        type: 'UNSET_USER'
    }
}

export {
    SetUser,
    UnSetUser
}