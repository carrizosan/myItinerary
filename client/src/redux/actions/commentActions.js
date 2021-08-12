import axios from 'axios'
import { API } from '../../helpers/api'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()

const commentActions = {
    newComment: (userToken, itineraryId, text) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post(API + '/comments/' + itineraryId, text,
                    { headers: { 'Authorization': 'Bearer ' + userToken } })
                if (response.status === 200) {
                    return response.data
                }
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
                console.log(error)
            }
        }
    },
    deleteComment: (userToken, commentId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete(API + '/comment/' + commentId,
                    { headers: { 'Authorization': 'Bearer ' + userToken } })
                if (response.status === 200) {
                    return response.data.response
                }
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
                console.log(error)
            }
        }
    },
    editComment: (userToken, commentId, text) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put(API + '/comment/' + commentId, text,
                    { headers: { 'Authorization': 'Bearer ' + userToken } })
                if (response.status === 200) {
                    return response.data.response
                }
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
                console.log(error)
            }
        }
    }
}
export default commentActions