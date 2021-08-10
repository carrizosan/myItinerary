import axios from 'axios'
import { API } from '../../helpers/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()
export const cityActions = {
    allCities: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API + '/cities')
                if (response.status === 200) {
                    dispatch({
                        type: 'ALL_CITIES', payload: {
                            cities: response.data.response,
                            preloaderCities: false,
                        }
                    })
                } else {
                    toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
                }
            } catch (error) {
                toast.error('Internal database error, try in a moment please', {position: toast.POSITION.TOP_RIGHT})
                console.log(error)
            }
        }
    },
}
