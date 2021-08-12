import axios from 'axios'
import { API } from '../../helpers/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()
export const itineraryActions = {
    getItineraries: (cityId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API + '/itineraries/' + cityId)
                response.status === 200
                    && dispatch({
                        type: 'ITINERARIES_CITY',
                        payload: {
                            itineraries: response.data.response,
                            preloaderItineraries: false
                        }
                    })
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
                console.log(error)
            }
        }
    },
    cleanItineraries: () => {
        return (dispatch, getState) => {
            dispatch({
                type: 'CLEAN_ITINERARIES',
                payload: {
                    itineraries: [],
                    preloaderItineraries: true
                }
            })
        }
    },
    sendLikeBack: (itineraryId, user) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API + '/like/' + itineraryId,
                    { headers: { 'Authorization': 'Bearer ' + user.token } }
                )
                if (response.status === 200) {
                    return response.data.response
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    checkUser: (itineraryId, user) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API + '/checkuser/' + itineraryId,
                    { headers: { 'Authorization': 'Bearer ' + user.token } })
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
