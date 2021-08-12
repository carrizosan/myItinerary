import axios from 'axios';
import { API } from '../../helpers/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()
export const authActions = {
    newUser: (user) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post(API + '/user/signup', user)

                if (response.data.validatorErrors) {
                    return response.data.validatorErrors //joi validator
                } else if (!response.data.success) {
                    return response.data.errorsValidator.details
                } else {
                    dispatch({
                        type: 'LOG_USER',
                        payload: response.data.response
                    })
                    toast.success("You've been registered!", {position: toast.POSITION.TOP_RIGHT})
                }
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
            }
        }
    },

    logIn: (user) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post(API + '/user/signin', user)

                if (response.data.success) {
                    dispatch({
                        type: 'LOG_USER',
                        payload: response.data.response
                    })
                } else {
                    toast.error('Email and/or password incorrect', {position: toast.POSITION.TOP_RIGHT})
                }
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
            }
        }
    },

    logOut: () => {
        return (dispatch, getState) => {
            dispatch({
                type: 'LOG_OUT'
            })
        }
    },

    logInWithLocalStorage: (user) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API + '/user/signinls', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                dispatch({
                    type: 'LOG_USER',
                    payload: {
                        ...response.data.response,
                        token: user.token
                    }
                })
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
            }
        }
    }
}