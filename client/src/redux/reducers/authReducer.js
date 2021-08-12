const initialState = {
    userLogged: null,
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem('userLogged', JSON.stringify({firstName: action.payload.firstName, userPic: action.payload.userPic}))
            localStorage.setItem('token', action.payload.token)
            
            return { ...state, userLogged: action.payload }
        case 'LOG_OUT':
            localStorage.clear()
            return {...state, userLogged: null}

        default:
            return state
    }

}